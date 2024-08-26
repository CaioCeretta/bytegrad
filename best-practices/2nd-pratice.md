## 2nd best practice - Folder Structure

We actually do not need to worry about folder structure, but one important thing is for us to be consistent with our
folder structure, we need to always think "if a new person joins our team, will they be able to understand what's going on?"

And if it's easy for them, i doesn't matter how we exactly structure it, it's okay, the personal preference of the instructor is

One big folder, for all the components, create subfolders inside the components folder, such as, for example, create
a folder for the header and put inside of it all the components related to it. 
We also can group components by feature, like an authentication folder.
One folder for state management, contexts and that kind of stuff
One folder named lib where we are going to have a bunch of utilities, like hooks, constants, utils, and a file for our types
a types.ts where we can add types we are going to use in multiple components


. src
 . components
 . contexts
 . lib

so this is the basic structure we must follow, the rest will be pretty simple to figure out as the app grows