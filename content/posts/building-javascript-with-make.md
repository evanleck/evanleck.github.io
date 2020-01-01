+++
title = "Building JavaScript with Make"
date = 2019-12-20
tags = ["JavaScript", "Make"]
draft = false
background = "teal"
+++

[Make][wiki] (or [GNU Make][gnu])’s basic value proposition is that it will
generate files based on other files. How those files are generated is up to you,
but that’s part of what’s great about Make: anything that you can do on the
shell can be scripted in Make, so you are free to use whatever tools or
languages you want.

While there are a near innumerable number of modern tools for building
JavaScript, I find myself reaching for Make any time I'm working on a project
that's not 100% JavaScript or one where I need to do some relatively simple
compilation from a source file to a target file.


## Getting Started

Let’s look at an example of what we can do with Make. We’ll start with a folder
structure like this:

```
- src
  - index.js
- dest
```

`dest` is empty and we have one source file that we’d like to compile from the
`src` directory to the `dest` directory. A simple Makefile that will “compile”
`src/index.js` to `dest/index.js` might look like this:

```makefile
dest/index.js:
  cp src/index.js dest/index.js
```

Running `make dest/index.js` will execute the recipe and copy your source file
into the destination directory as-is. It's not the most exciting thing ever, but
it's a starting point.

Crucially, Make doesn’t know how often it should update the `dest/index.js`
target. If you make changes to your source file and re-run `make dest/index.js`
you'll see that your changes aren't reflected in the destination file. We
haven’t told Make about the dependencies that the target has — its
prerequisites.


## Prerequisites

Let’s teach Make what’s needed to keep `dest/index.js` up to date. Since
`dest/index.js` is compiled from the source of `src/index.js`, `src/index.js` is
considered a prerequisite, or dependency, of `dest/index.js`. Here’s an updated
version of our Makefile from above that lists `src/index.js` as a prerequisite:

```makefile
dest/index.js: src/index.js
  cp src/index.js dest/index.js
```

Make understands that if a prerequisite has been updated then any targets that
depend on that prerequisite need to be updated. Make looks at the modification
time of the files listed as prerequisites to determine if the target should be
rebuilt, so it only rebuilds what’s out of date. It also won't rebuild targets
that exist but don't have any prerequisites because it doesn't know how to tell
if the target is out of date. In our example above, we’ve told Make that
`dest/index.js` should be rebuilt any time `src/index.js` is updated.


## The Recipe

The commands that are run to update a target in Make are called [the
recipe][recipe] and in our case, the recipe is pretty boring. Make knows what
file to generate (the target, `dest/index.js`) and when to generate it (when the
prerequisites, `src/index.js`, have been changed), but it’s not really doing
anything interesting with the source file.

Let’s use [terser][terser] to minify our source file on its way to `dest`.
Assuming we've got a version of NodeJS installed that includes the [`npx`][npx]
tool, the command to compress our source file and save it to our destination
folder looks like this:

```bash
npx terser src/index.js --compress --output dest/index.js
```

You can change the options around however you’d like, but the idea remains the
same: there’s an input file, some options, and an output file. Now let’s take
that and use it in our Makefile's recipe:

```makefile
dest/index.js: src/index.js
  npx terser src/index.js --compress --output dest/index.js
```

Now, every time `src/index.js` changes, our new recipe using terser will be run
and the source file will be compressed and output to Make’s target file. We’ve
taught Make how to *ahem* make our target!


## More Than One Target

At this point, we’ve got Make compressing our source file and outputting it to
our destination. Let’s add a new `src/lib.js` file to our project and teach Make
how to handle it.

The most naive approach to handling our new file would be to duplicate our
existing target/recipe setup, changing only the file names:

```makefile
dest/index.js: src/index.js
  npx terser src/index.js --compress --output dest/index.js

dest/lib.js: src/lib.js
  npx terser src/lib.js --compress --output dest/lib.js
```

This kinda sucks though. There’s a ton of duplication and when we inevitably
need to add a third, fourth, or hundredth file then this will start to come
apart. Instead, let’s use Make’s [pattern rules][patternrules] combined with
[automatic variables][autovars] to teach Make not just how to handle each
specific file, but how to handle this *kind* of file. In this case, we’re going
to teach Make how to handle any JavaScript file that’s in our source directory.
We’ll first look at what our new target/recipe looks like and then dissect it to
understand what’s going on.

```makefile
dest/%.js: src/%.js
  npx terser '$<' --compress --output '$@'
```

The target, prerequisites, and recipe look _very_ similar to before, but with
some new stuff replacing the old file names. To explain a few things that are
happening:

- The “%” in the target tells Make to match any non-empty string.
- The “%” in the prerequisite is filled in by Make with the same “stem” or
  portion of the target name that was matched in the target. For example, if
  `dest/turkeys.js` was handed to this target, the “%” in the prerequisite would
  expand to `turkeys`.
- The “$<“ in the recipe is an automatic variable populated by Make with the
  name of the first prerequisite. When we run `make dest/index.js`, the “%”
  matches the stem “index” and expands our first prerequisite to “src/index.js”
  which is then handed to the recipe, so “$<“ gets expanded to the same:
  “src/index.js”.
- The “$@“ in the recipe is another automatic variable populated by Make, but
  this time with the name of the target file.

Now if you run `make dest/index.js` or `make dest/lib.js` they’ll both be
handled by the same target and run the same recipe, generating the appropriate
file based on the corresponding prerequisite.


[autovars]: https://www.gnu.org/software/make/manual/make.html#Automatic-Variables
[gnu]: https://www.gnu.org/software/make/
[npx]: https://blog.npmjs.org/post/162869356040/introducing-npx-an-npm-package-runner
[patternrules]: https://www.gnu.org/software/make/manual/make.html#Pattern-Rules
[recipe]: https://www.gnu.org/software/make/manual/html_node/Recipes.html
[terser]: https://github.com/terser/terser
[wiki]: https://en.wikipedia.org/wiki/Make_(software)
