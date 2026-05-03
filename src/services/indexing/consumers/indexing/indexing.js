import documentIndexing from "./document/document-indexing";
import websiteIndexing from "./website/websiteIndexing";

const indexing = (message) => {
    if (message.type === 'docs') documentIndexing(message.urlDocs);
    if (message.type === 'URL') websiteIndexing(message.url);
}

export default indexing;