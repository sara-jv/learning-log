[Course Link](https://frontendmasters.com/courses/web-perf/)

# Web Performance Fundamentals

## Part 1: Understanding

### Why is it important?
- Google says so; they rank sites based on performance.
- Time = angry users = customers leave.
  - Competitors will capitalize on your slowness.

### What is fast?
- Ads not being intrusive / content quickly loaded.
  - NPR = publicly funded, don't need ads so can focus on content.
- Waiting time feels subjective (long for you could be short for me).
  - If the user is distracted / can do something while waiting, it feels less long.

### Psychology of waiting
- People want to start.
- Bored time feels slow.
- Anxious time feels slow (sensitive info like waiting for bank info).
- Unexplained time feels slow - why am I waiting?
- Uncertain time feels slow - 1 min/10 min/1 hour??
- Will wait for value.

### Measuring Web Performance
- Old = page load.
  - Measured with load event.
  - Lazy loading gamed the measuring system; site loads but JS takes a while to load.
- Now  - use 4 web vitals:
  - FCP: First Contentful Paint.
  - LCP: Largest Contentful Paint.
  - FID: First Input Delay.
  - CLS: Cumulative Layout Shift.
- Google measures web vital values.

### FCP: First Contentful Paint
- AKA: Respond Quick.
- Time until the user sees an indication that the page is loading.
  - First click link to when first meaningful content renders.
  - No more uncertainty of the white page.

### LCP: Largest Contentful Paint
- AKA: Get To The Point.
- Time until the user thinks the site is almost done loading.
  - Measured in pixel area.
  - Time at which the largest area is rendered.
  - Proxy for when the user thinks the site is almost done.
  - Images can be LCP.

### CLS: Cumulative Layout Shift
- AKA: Don't Move Stuff.
- Movement distance and impact of page elements during the lifetime of the document that the user sees.
- All the times this happens during the lag time on the page.
- Total shift of all elements. Recorded during the lifetime of the page.
- How does this affect a client-side rendered app?
  - Big portion of page gets rerendered instead of hitting server.
  - Makes score worse.

### FID: First Input Delay
- AKA: Don't Load Too Much.
- Browser time delay between the user's first click and the execution of application code.
- Browser busy getting JS ready even though the page looks ready, can't first click event.

Google has scores for each metric, which you can see in a detached dev tools window. Use Lighthouse to get a performance report. Know that the score is affected by:
- Your machine + network.
- Chrome window size.
- Chrome application priority (Chrome needs to be in the foreground).
- IMPORTANT: Use incognito and turn off extensions.

### Where should we measure from?
- What's happening? Our server transfer some HTML, JS, CSS over wires to the user.
- We need to consider the network.
- Field data! Capture data from people who use the site.
  - RUM tools (real user monitoring tool).
  - But also noisy...people use bad networks.
- Lighthouse = lab data = no noise.
- Synthetic data = bot hits site periodically = some noise (machine might go down).
- Field = real data but lots of noise. Like bot data, which we don't care about.

Resources:
1. Chrome User Experience Reports (CrUX)
2. [Google resource on web best practices](https://web.dev/).

### Interpreting Field Data
- Lab Data = score but field data spans more values. So how do we interpret / get the whole picture?
- Field data = sample.
- First identify bias in data. Not all browsers report web vitals.
  - Ex: Chrome on iOS =/= Chrome. It's a wrapper around Safari and doesn't report vitals.
- How to roll up all these #s?
  - Avg = bad measure. (99, 90, 70 , 63) give 90 but half users have a bad time.
  - Percentiles!
    - p50/p75 (Google cares about this one)/p95 (You should care about, what the worse user sees).

## Part 2: Improving

### Business Objectives
- Why have a site? (where the $ comes from?)
  - Awareness.
  - Retention.
  - Conversion.
  - Competition.
    - Being fast only matters if it's 20% faster (10ms doesn't matter).
    - [Lightest.app](https://www.lightest.app/): Visualize web performance against competitors.

### Insight with Website Analytics
- Bounce rate.
- Time on site.
We see anomalies...what now?

How to get real data? USE AN API!
- [window.performance](https://developer.mozilla.org/en-US/docs/Web/API/Performance)
  - Performance.getEntries() = entry is 1 network event.
  - Entry contains a bunch of properties.
  - Ties to an HTTP browser request.
- PerformanceObserver(), tell it to look for x event and then we can capture.
  - But...also called entry, but it's different.
  - Each event has a unique name.
  - **WebVitals library from Google does this**.

How to use this data?
- Compare bounce rate and session time to your stats you've collected and see if there is a relationship to draw conclusions.

### Improve Web Vitals
Do less! Fewer bytes, docs, less overhead, etc.

#### How to Improve First Contentful Paint
- Time until the user sees an indication that the page is going to load.
- 3 parts:
  - Quick Servers (what's the constraint).
    - Sized correctly.
    - Minimal processing.
      - Ex: if serving just an index.html, don't call the database unless you need it.
    - Network Bandwidth.
  - Small Documents.
    - Content size.
      - Reduce payload to get what you need.
      - HTML doc if 100k that's too much.
      - Img = 1 mg, bigger is too much.
    - Compression.
      - Gzip compression.
      - Brotli = more advanced.
  - Improve Transmission.
    - Reduce distance with CDNs to give a copy at edge of all user networks.
    - Caches a copy for you.
    - Cloudflare, etc.

#### How to Improve Largest Contentful Paint
- Time between start and user sees most of the page is ready.
- When first HTML gets brought down = FCP.
- In Lighthouse report --> view original trace --> see waterfall of what's loaded and when.
- In general, we want to do fewer things to improve this metric.
- How to Defer Loading Resources.
  - Identify what's essential. Ex: images below the fold, maybe JS doesn't need to happen immediately or is optional.
    - What if my JavaScript is Asynchronously loaded --> still loaded / adds to blocking time.
      - Browser ignores the async decorator and JS can still block other processes.
    - DONT USE ASYNC! USE DEFER!
      - `<script defer src="blah.js></script>`.
      - Tells browser don't load it, do it later!
      - Don't execute until done with load event.
      - No longer a blocking factor.
  - Re-Order.
    - Browser respects order of things in HTML.
    - Analytics and enhancements can be at the end of the doc.
    - Images?
      - Add lazy loading: `<img loading="lazy"></img>`.
      - BUT it's not compatible with Safari =(
      - Use JavaScript!
        - Make one.
        - Replace src for below the fold images w/data-src.
        - LAZY LOAD ANYTHING WITH A SRC! Videos/iframes/etc.
  - Optimize Images.
    - Ex: pic that's 1200px wide.
      - Display depends on device and browser.
      - How to use smallest?
    - Use a srcset! `<img src="pic-1200.jpg" srcset="pic-600jpg 600w, ..." sizes="(max-width:600px) 600px ..." />`.
    - Optimize img like TinyPNG.
  - Reduce Request Overhead.
    - Use HTTP2, available on most servers.
      - Pros: reuse connections, faster.
      - Cons: server setup + compatibility, SSL required.
    - Cached request.
      - Cons: only for returning users.
      - Only works on secondary request.
      - Make sure JS/img has appropriate headers.
        - `cache-control` time to hold onto file.
        - `expires`.
        - `etag` give hashed version to grab content quickly.
    - Preloading.
      - Ex: we have CSS that uses fonts.
      - Tell browser to get right what we need right away!
        - preconnect (do DNS lookup right away): `<link rel="preconnect" href="https://fonts.com" />`.
        - preload (get file right away): `<link rel="preload" href="/icons.css" />`.

### Should we load low-quality images first then higher? <-- Shopbop?
- Sends more bytes over wire, but feels faster because we see something sooner.
- Shouldn't always do it because requires preprocessing and increases load time.
- Big images that add value.

#### How to Improve Cumulative Layout Shift
Users find images moving the layout really annoying.
- We should tell the browser to save space for an image.
  - Each browser is different...so we set the aspect ratio so the browser knows the height:width.
  - Go to viewport size --> look at img size --> give explicit width / height.

#### Improving First Input Delay
- First click --> execution of app code.
- Don't load too much!
- Interacts w/ LCP.
  - If we have a ton of JS before LCP and we have a loading screen, users might be ok.
  - If JS is after the LCP, then the user interacts and the browser feels laggy.
  - People will wait for value.
    - How anxious are people?

#### Data Projection
- Flame charts - exp and how many users had exp.
  - Median/75th/90th percentiles.
- Web Vitals.

## Part 3: Planning

### Performance Culture
- Make it fast from the beginning by making performance a team value, not a task. 
- Get data fast
  - Test performance early
    - As soon as you get something on the page / dev server, run lighthosue on it.
  - Test performance often
  - Monitor from the beginning 

### Design
- Should be part of planning!
  - ex: Login page --> should complete in less than 2s
- Consider when setting goals
  - Who are the users?
  - Devices used?
  - How long will they wait?
  - How fast would impress?
    - 20% fast than competitor
  - "My site should in x seconds on a y connection"
  - [Performance Budget Calculator](https://www.performancebudget.io/)
    - givess estimated load times

In general, make your org care by tying to revenue. Look at performance data + business data and find relationship.

Single Page Apps are complciated. Look at JavaScript performance & webpack courses.

## Takeaways
- Are we plumbing Shopbop with Google Web Vitals to get field data for web vital metrics?
- Have we considered serving low-quality img/video first to reduce perceived slowness of loading important imgs/assets
