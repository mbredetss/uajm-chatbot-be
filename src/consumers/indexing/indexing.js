import documentIndexing from "./document/document-indexing";
import websiteIndexing from "./website/websiteIndexing";

const indexing = (message) => {
    if (message.type !== 'url') {
        documentIndexing(message);
        return;
    }

    websiteIndexing(message);
    return;
}

export default indexing;