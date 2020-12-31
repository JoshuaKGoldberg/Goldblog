# Playing with Dependency Injection in Node

As of 2020, my biggest gripe with the mainstream JavaScript ecosystem (particularly React and friends) is the lack of proper dependency injection in the popular

## Recap: Dependency Injection?

Suppose you're writing a function that does something expensive, such as reading from the file system:

```js
import { readFile } from "fs/promises";

export const doesFileContainText = async (filePath, text) => {
    return (await fs.readFile(filePath)).toString().includes(text);
};
```

...and another function calls it directly:

```js
export const doesReadmeContainName = async (name) => {
    return await doesFileContainText("README.md", name);
};
```

This is problematic for unit tests because you now have to ermember to mock out the `fs` module in both the bottom function's tests _and_ the tests for functions that call it:

```js
// Why are we doing this?
// Will we remember to change this is doesFileContainText gets refactored?
const mockReadFile = jest.fn();
jest.mock("fs/promises", () => ({
    readFile: mockReadFile,
}));

describe(doesReadmeContainName, () => {
    it("returns true when the file contains the name", async () => {
        const name = "josh";

        readFile.mockResolvedValue(name);

        expect(await doesReadmeContainName(name)).toBeTrue();
    });
});
```

## External Dependency Injection

You might instead have this function take in an object for the file system as a parameter ("injected"):

```js
export const doesFileContainText = async (fs, filePath, text) => {
    return (await fs.readFile(filePath)).toString().includes(text);
};
```

Whoever calls this function would need to pass in `fs`:

```js
export const doesReadmeContainName = async (fs, name) => {
    return await doesFileContainText(fs, "README.md", name);
};
```

You're now forced to directly pass in a mock object to all tests that need it:

```js
describe(doesReadmeContainName, () => {
    it("returns true when the file contains the name", async () => {
        const name = "josh";
        const fs = {
            readFile: async () => name,
        };

        expect(await doesReadmeContainName(fs, name)).toBeTrue();
    });
});
```

**Pros** 👍: This is really nice for making sure you mock out only what you need, and do it properly.
It'd be pretty hard to accidentally, say, read or write to the file system in unit tests when everything has to be explicitly passed in.

**Cons** 👎: That's a good amount of boilerplate code.
If your app has a lot of functions calling each other, you might end up passing all sorts of dependencies around: file systems, loggers, network requests...

```js
export const runApp = (argv) => {
    return nextInCallStack(
        console,
        databaseThingy,
        fs,
        whateverElse,
        // ...
        argv
    );
};
```

For this post, I'll refer to this as **external dependency injection**: referring to mocking out _external_ dependencies from your app.

### Internal Dependency Injection

Why do functions in the middle of the call stack need to rely on implementation details of functions further down in it?
