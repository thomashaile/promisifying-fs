# Promisify FS

Each of these exercises contains a working script written with callbacks.  Your task is to refactor each script twice: once with _promise_ syntax, once with _async/await_ syntax.

Enjoy!

---

Looking for a challenge?  Think about which file manipulations need to wait for each other and which don't, try using `Promise.all` for file operations that can happen at the same time.

For example in exercise 4:

You need to swap the contents of two files.  Using callbacks you have to read one file then the next.  But reading two files doesn't have to happen in any specific order, you just can't begin writing until both files have been read. This makes exercise 4 a good use case for `Promise.all`:

1. Read both files using `Promise.all`
1. Write the new contents to each file with `Promise.all`
1. Read the new file contents and assert the values
