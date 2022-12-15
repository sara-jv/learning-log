## Cross Site Scripting

My code review produced a security alert for the following implementation:
```
<c:set var="userAgent" value='${pageContext.request.getHeader("User-Agent")}'/>
<c:set var="userRequestUrl" value='${pageContext.request.requestURL}'/>
<c:if test="${fn:contains(userAgent, 'Mobile')}">
    <link rel="canonical" href="${userRequestUrl}" />
</c:if>

<c:if test="${not fn:contains(userAgent, 'Mobile')}">
    <link rel="canonical" href="${userRequestUrl}" />
    <link rel="alternate" href="${userRequestUrl}" media="only screen and (max-width: 640px)" />
</c:if>
```
