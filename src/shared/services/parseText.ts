export function parseText(text: string): string {
    // Parsear URLs
    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    const urlRegexhashTags = /(\B#(\w+))/gi;
    

    const withUrls = text.replace(urlRegex, (url) => {
        return `<a class="links-posts" href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });

    const withLineBreaks = withUrls.replace(/\n/g, '<br>');

    const withHashTags = withLineBreaks.replace(urlRegexhashTags, (hashTag) => {
        return `<a class="hashtag-posts" href="/feed/hashtag/${hashTag.slice(1)}" rel="noopener noreferrer">${hashTag}</a>`;
    });
    
    return withHashTags;
}