async function loadASR() {
    const response = await fetch("all_wavs_trns.csv");
    const text = await response.text();

    const lines = text.trim().split("\n");
    const header = lines[0].split(",");
    const pathIdx = header.indexOf("relative_path");
    const asrIdx = header.indexOf("nemo_asr");

    const asrMap = {};

    for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        const rel = cols[pathIdx];
        let asr = cols[asrIdx]?.replace(/^"|"$/g, "").trim();
        if (!asr) asr = "failed to transcribe";
        asrMap[rel] = asr;
    }

    document.querySelectorAll(".asr-cell").forEach(cell => {
        const src = cell.dataset.audioSrc.replace(/^samples\//, "");
        cell.textContent = asrMap[src] || "failed to transcribe";
    });
}

loadASR();
