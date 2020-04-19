function encodeText(text) {
    return text.replace(/[ "%&'+=?\^`~]/g, match =>
        match === ' ' ? '_' : `%${match.charCodeAt(0).toString(16)}`
    );
}

export default function WikiLink({ children, page, section }) {
    const anchor = section ? `#${section}` : '';

    return (
        <a
            href={`https://runescape.wiki/w/${encodeText(page || children)}${anchor}`}
            rel="nooopener noreferrer"
            target="_blank"
        >
            {children}
        </a>
    );
}
