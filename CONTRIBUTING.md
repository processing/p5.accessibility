## Get Involved
p5.js and p5.accessibility.js are collaborative projects created by many individuals, and you are invited to help. All types of involvement are welcome. See the [community section](https://p5js.org/community/) to get started!

### How Can I Contribute? 
#### First Timers
For first-time contributors or those who want to start with a small task: check out our list of [good first bugs](https://github.com/processing/p5.accessibility/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22). First read the github discussion on that issue and find out if there's currently a person working on that or not. If no one is working on it or if there has was one claimed to but has not been active for a while, ask if it is up for grabs. It's okay to not know how to fix an issue and feel free to ask questions about to approach the problem! We are all just here to learn and make something awesome. Someone from the community would help you out and these are great issues for learning about the library and its development process.

#### Want something more challenging?
If you're already familiar with the project or would like take on something a little more challenging, please take a look at the [priority: high](https://github.com/processing/p5.accessibility/issues?q=is%3Aopen+is%3Aissue+label%3A%22priority%3A+high%22) issues.

#### Feature Enhancement
If you want to work on building new things, please take a look at [type: feature](https://github.com/processing/p5.accessibility/issues?q=is%3Aopen+is%3Aissue+label%3A%22type%3A+feature%22).

If you'd like to work on a bug, please comment on it to let the maintainers know. If someone else has already commented and taken up that bug, please refrain from working on it and submitting a PR without asking the maintainers as it leads to unnecessary duplication of effort.

##### Contribution guides
* https://guides.github.com/activities/hello-world/
* https://guides.github.com/activities/forking/

### Development installation

* Clone or download this repo
* `cd` into the repo
* run `npm install` 
* run `grunt curl` to get the latest versions of the CDN libraries
* make changes to the source code in the `src` folder
* run `grunt` in the root folder, this will update the library in `/dist/p5-accessibility.js`
* keep in mind that the examples here reference the latest CDN link to the library and not the `/dist/p5-accessibility.js` that you might generate. If you want to test your changes with the existing examples, change the index.html files in the examples to point to your local `/dist/p5-accessibility.js`
