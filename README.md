# Why another Lighthouse server?

Yeah, I know. There are some solutions for this. But sadly, I had super heavy problem with running them... A lot of them was based on `chrome-launcher`, and I just couldn't force it to run... And my bugs, errors and issues was pretty unique, becouse I coudn't find any solutions.

Some error changed after I've turned on virtualization on my motherboard (no, I'm not using docker for this project 🙀), some error was different while running via WSL Ubuntu 18.04. But everything was never valid... 🖤

## So now, I'm using PUPPETEER

So, I've rewrite everything I've fount with chrome-launcher for puppeteer, made some unit test, and viola. It works 🚀

## Have fun!

I hope, that if somebody is having same issues with default env for Lighhouse NodeJS server, this repo could help them out 😊
