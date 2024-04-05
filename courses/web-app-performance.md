[Course](https://frontendmasters.com/courses/web-app-performance/)

# Web App Performance

## The Problem
- Mostly a frontend issue
- Should already
  - Optimize network transfer
  - Work w/TLS and HTTP/2
  - CSS as Appetizer (small and first loaded)
  - JavaScript is dessert
  - Optimize Images
  - Defined a policy for HTTP Cache
  - Using Service Workers
- Time to Interactive
- Users feel like the webpage is ready to use when the images are loaded.
- If load time goes from 1s to 10s, bounce chance increases by 123%
 
We underestimate the mobile space
- Historically, we made completely different m.dot sites --> iphone came around so we could zoom in and out which was bad experience --> then came responsive design...but 3 css sheets of different media queries = more things downloaded
- Looking at browsers
  - [Browser Market Share Worldwide](https://gs.statcounter.com/)
    - CHROME! by the far the most widely used
  - [Cloudflare Radar](https://radar.cloudflare.com/adoption-and-usage)
    - Another tool for understand brower usage
- DID YOU KNOW: Facebook / Instagram have their own inner browsers with different capabilities. Different engine than the browser of the device.

Cellular data
- 60% of folks are on 4G, only 12% on 5G. This changes on region.
- bandwidth isn't the issue, latency is
  - time delay btwn when a data pkt is sent and when its received in milliseconds.
  - 2G has very bad latency
  - Not every country has 4G/5G and 28% of users use 3G

CPU/GPU 
- Mobile is worse median exp / more latent  

Mobile are always slower, but 50%+ of users.

Metrics
Tools
Charts / Diagrams
Understanding Browsers
Basic Optimizations
Hacking Performance
Performance APIs