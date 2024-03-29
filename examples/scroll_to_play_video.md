
Sandbox: https://codesandbox.io/s/sleepy-ride-jom0qz?file=/src/App.js:425-437

Using Intersection Observer API: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
> The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.
```javascript
  /**
   * An effect that attempts to play a video if it is in the viewport.
   * If the video is already playing, then we do not attach any events. “tryToPlay” will ignore requests to play videos already playing.
   */
  const ref = useRef(null);
  useEffect(() => {
    const videoElement = ref.current;
    // observe video wrapper
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const videos = videoElement.querySelectorAll('video');
        if (! videos ) return;
        videos.forEach((video) => {
          if (entry.isIntersecting) {
            tryToPlay(video, `scrolled into viewport`, logger).then((success) => {
                    if (success) setVideoPlaying(true)
                  });
          } else {
            video.pause();
            setVideoPlaying(false)
          }
        })
      });
    }, // indicates at what percentage of the target's visibility the observer's callback should be executed
      { threshold: 0.2 });

    observer.observe(videoElement);

    return () => {
      observer.unobserve(videoElement);
    };
  }, []);

 return (
    <ComponentContainer data-testid="video-container">

      {posterSrc && (
        <BlockImage data-testid="video-poster" alt="video-poster" src={posterSrc} width="100%" />
      )}
        <HideVideoDiv videoPlaying={videoPlaying} aria-hidden={!videoPlaying}>
        <VideoWrapper
          data-testid="homepage-video"
          ref={ref}
          key={html}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </HideVideoDiv>
    </ComponentContainer>
  );
```

Using react-intersection-observer library: https://www.npmjs.com/package/react-intersection-observer/v/9.4.3
Abstracts away some of the logic, so a little bit cleaner / easier to read.

```javascript
  // get all videos on load
  useEffect(() => {
    setVideos(Array.from(document.querySelectorAll('video')));
  },[]);
  
  // handle change of inView state
  const handleInView = (inView) => {
    if (inView) {
      videos.forEach((video) => {
        tryToPlay(video, `scrolled into viewport`, logger).then((success) => {
          if (success) { setVideoPlaying(true) } else {setVideoPlaying(false)}})
      })
    } else {
      videos.forEach((video) => {
        video.pause();
        setVideoPlaying(false)
      })
    }
  }

  // useInView hook monitors inView state of the video wrapper component.
  const { ref, inView } = useInView({
    // indicates at what percentage of the target's visibility the observer's callback should be executed
    threshold: 0.2,
  });
  
  // when inView state changes, trigger fn
  useEffect(() => {
    handleInView(inView)
  },[inView])


  return (
    <ComponentContainer data-testid="video-container">

      {posterSrc && (
        <BlockImage data-testid="video-poster" alt="video-poster" src={posterSrc} width="100%" />
      )}
        <HideVideoDiv videoPlaying={videoPlaying} aria-hidden={!videoPlaying}>
        <VideoWrapper
          data-testid="homepage-video"
          ref={ref}
          key={html}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </HideVideoDiv>
    </ComponentContainer>
  );
}

```

Above impl has utils to make testing easier: https://github.com/thebuilder/react-intersection-observer#testing
Jest examples:
```javascript

  it('should play when scrolled into view', async () => {
    // mock video.play
    const playStub = jest
      .spyOn(window.HTMLMediaElement.prototype, 'play')
      .mockImplementation(() => {
      })
    const wrapper = await (render(
      <Video
        dependencyContainer={mockDependencyContainer}
        desktopVideo={'mockDesktopVideo'}
        mobileVideo={'mockMobileVideo'}
        fallbackText={'mockFallbackText'}
      />
    ).findByTestId('homepage-video'));

    // observer entry isIntersecting returns true
    mockAllIsIntersecting(true)

    // expect play to have been called for each video
    expect(wrapper.querySelectorAll('video')).toHaveLength(2);
    expect(playStub).toHaveBeenCalledTimes(2);
    playStub.mockRestore()
  });

  it('should not play when not scrolled into view', async () => {
    // mock video.play
    const playStub = jest
      .spyOn(window.HTMLMediaElement.prototype, 'play')
      .mockImplementation(() => {
      })
    const wrapper = await (render(
      <Video
        dependencyContainer={mockDependencyContainer}
        desktopVideo={'mockDesktopVideo'}
        mobileVideo={'mockMobileVideo'}
        fallbackText={'mockFallbackText'}
      />
    ).findByTestId('homepage-video'));

    // observer entry isIntersecting returns false
    mockAllIsIntersecting(false)

    // expect play to not have been called for each video
    expect(wrapper.querySelectorAll('video')).toHaveLength(2);
    expect(playStub).not.toHaveBeenCalled();
    playStub.mockRestore()
  });
  ```
