import { useState } from "react";

// --- KONFIGURACJA ---
const TOOL_VARIANTS = ["s13", "m15", "pushon", "fractal", "fts"];
const BUSHING = ["s13", "m15", "pushon"];
const BUSHING_VARIANTS = ["2", "3", "4", "5", "7"];
const SZPILKI_VARIANTS = ["10", "12.5", "16.5", "pushon"];
const COOLING_VARIANTS = ["m15", "s13", "pushon", "fts"];
const OM_PARTS = ["omy_s13_1", "omy_s13_2", "omy_m15_1", "omy_fts"];
const PARTS_CONFIG = [
  { name: "wal" },
  { name: "tuba_tul" },
  { name: "noz_tul" },
  { name: "noz_obr" },
  { name: "pas_tul" },
  { name: "korytka" },
  { name: "plyta_kielich" },
  { name: "szpilki", variants: SZPILKI_VARIANTS },
  { name: "matryca", variants: TOOL_VARIANTS },
  { name: "bushing", variants: BUSHING },
  { name: "otwor", variants: BUSHING_VARIANTS },
  { name: "matryca_chlodz", variants: COOLING_VARIANTS },
  { name: "szczeki", variants: TOOL_VARIANTS },
  { name: "trzpienie", variants: TOOL_VARIANTS },
  { name: "przekladacze", variants: TOOL_VARIANTS },
  { name: "dopychacz" },
  { name: "omy_s13_1", isOM: true },
  { name: "omy_s13_2", isOM: true },
  { name: "omy_m15_1", isOM: true },
  { name: "omy_fts", isOM: true },
  { name: "nakrecarka" },
  { name: "prowadzica" },
  { name: "luk" },
  { name: "unloader" },
  { name: "pas" },
  { name: "plyta_napych" }
];
const DIAMETERS = ["DIA28", "DIA30", "DIA35", "DIA40", "DIA50"];
const DEFAULT_VARIANTS = {
  A: {
    DIA28: { matryca: "s13", bushing:"s13", matryca_chlodz:"s13", otwor:"2", przekladacze:"s13", szczeki: "s13", trzpienie: "s13", szpilki: "12.5" },
    DIA30: { matryca: "s13", bushing:"s13", matryca_chlodz:"s13", otwor:"2", przekladacze:"s13", szczeki: "s13", trzpienie: "s13", szpilki: "12.5" },
    DIA35: { matryca: "s13", bushing:"s13", matryca_chlodz:"s13", otwor:"2", przekladacze:"s13", szczeki: "s13", trzpienie: "s13", szpilki: "12.5" },
    DIA40: { matryca: "s13", bushing:"s13", matryca_chlodz:"s13", otwor:"2", przekladacze:"s13", szczeki: "s13", trzpienie: "s13", szpilki: "12.5" },
    DIA50: { matryca: "pushon", bushing:"pushon", matryca_chlodz:"pushon", otwor:"pushon", przekladacze:"pushon", szczeki: "pushon", trzpienie: "pushon ", szpilki: "pushon" }
  },
  B: {
    DIA28: { matryca: "s13", bushing:"s13", matryca_chlodz:"s13", otwor:"2", przekladacze:"s13", szczeki: "s13", trzpienie: "s13", szpilki: "12.5" },
    DIA30: { matryca: "s13", bushing:"s13", matryca_chlodz:"s13", otwor:"2", przekladacze:"s13", szczeki: "s13", trzpienie: "s13", szpilki: "12.5" },
    DIA35: { matryca: "s13", bushing:"s13", matryca_chlodz:"s13", otwor:"2", przekladacze:"s13", szczeki: "s13", trzpienie: "s13", szpilki: "12.5" },
    DIA40: { matryca: "s13", bushing:"s13", matryca_chlodz:"s13", otwor:"2", przekladacze:"s13", szczeki: "s13", trzpienie: "s13", szpilki: "12.5" },
    DIA50: { matryca: "pushon", bushing:"pushon", matryca_chlodz:"pushon", otwor:"pushon", przekladacze:"pushon", szczeki: "pushon", trzpienie: "pushon ", szpilki: "pushon" }
  }
};
const defaultOMs = () => ({
  A: { DIA28: {}, DIA30: {}, DIA35: {}, DIA40: {}, DIA50: {} },
  B: { DIA28: {}, DIA30: {}, DIA35: {}, DIA40: {}, DIA50: {} }
});

// --- FUNKCJE POMOCNICZE ---
function generatePartsTable(diameter, variantSet, omSet) {
  const variants = variantSet[diameter] || {};
  return PARTS_CONFIG
    .filter(part => {
      if (part.isOM) {
        return omSet && omSet[part.name];
      }
      return true;
    })
    .map(part => {
      const variant = part.variants ? variants[part.name] : null;
      return {
        name: part.name,
        ilosc: 1,
        numer: `${part.name}-${diameter}${variant ? "-" + variant : ""}`,
        variant
      };
    });
}
function getPartsToAdd(oldParts, newParts) {
  return newParts.filter(newPart => !oldParts.find(p => p.numer === newPart.numer));
}
function getPartsToRemove(oldParts, newParts) {
  return oldParts.filter(oldPart => !newParts.find(p => p.numer === oldPart.numer));
}

// --- KOMPONENTY ---
function VariantsPanel({ version, diameter, variants, setVariants }) {
  const otherVersion = version === "A" ? "B" : "A";
  const partsWithVariants = PARTS_CONFIG.filter(p => p.variants && !p.isOM);

  const thisVariants = (variants[version] && variants[version][diameter]) || {};
  const otherVariants = (variants[otherVersion] && variants[otherVersion][diameter]) || {};

  function getBgColor(partName) {
    const v1 = thisVariants[partName];
    const v2 = otherVariants[partName];
    if (!v1 && !v2) return "transparent";
    if (!v1 || !v2) return "transparent";
    if (v1 === v2) return "#d4edda";
    return "#f8d7da";
  }
  function getBorderColor(partName) {
    const bg = getBgColor(partName);
    if (bg === "#d4edda") return "#3c763d";
    if (bg === "#f8d7da") return "#a94442";
    return "#ccc";
  }

  function handleChange(partName, value) {
    setVariants(prev => ({
      ...prev,
      [version]: {
        ...prev[version],
        [diameter]: {
          ...(prev[version][diameter] || {}),
          [partName]: value
        }
      }
    }));
  }

  return (
    <div style={{
      background: "#f5f5f5", border: "1px solid #ccc", borderRadius: 8,
      padding: 12, margin: "12px 0", maxWidth: 500
    }}>
      <strong>Warianty narzędzi ({version}, {diameter}):</strong>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 8 }}>
        {partsWithVariants.map(part => {
          const value = thisVariants[part.name] || "";
          return (
            <label
              key={part.name}
              style={{
                display: "flex",
                flexDirection: "column",
                background: getBgColor(part.name),
                border: `1.5px solid ${getBorderColor(part.name)}`,
                borderRadius: 4,
                padding: "6px 10px",
                minWidth: 110,
                fontWeight: 500
              }}
            >
              {part.name}:
              <select
                value={value || part.variants[0]}
                onChange={e => handleChange(part.name, e.target.value)}
                style={{
                  marginTop: 4,
                  borderRadius: 3,
                  border: `1.5px solid ${getBorderColor(part.name)}`,
                  outline: "none",
                  background: "#fff"
                }}
              >
                {part.variants.map(v => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function OMPanel({ version, diameter, omSet, setOmSet, enabled }) {
  function handleOMChange(partName, checked) {
    setOmSet(prev => ({
      ...prev,
      [version]: {
        ...prev[version],
        [diameter]: {
          ...(prev[version][diameter] || {}),
          [partName]: checked
        }
      }
    }));
  }
  return (
    <div style={{
      background: "#f5f5f5", border: "1px solid #ccc", borderRadius: 8,
      padding: 12, margin: "12px 0", maxWidth: 500
    }}>
      <strong>Wybierz OMy ({version}, {diameter}):</strong>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 8 }}>
        {OM_PARTS.map(partName => (
          <label key={partName} style={{ opacity: enabled ? 1 : 0.5 }}>
            <input
              type="checkbox"
              checked={!!(omSet[version][diameter] && omSet[version][diameter][partName])}
              disabled={!enabled}
              onChange={e => handleOMChange(partName, e.target.checked)}
            />
            &nbsp;{partName}
          </label>
        ))}
      </div>
    </div>
  );
}

function PartsTable({ title, parts, compareParts }) {
  // compareParts to tablica parts z drugiego panelu
  function getBgColor(part, compareParts) {
    if (!part.variant) return "transparent";
    const compare = compareParts.find(p => p.name === part.name);
    if (!compare || !compare.variant) return "transparent";
    if (part.variant === compare.variant) return "#d4edda";
    return "#f8d7da";
  }
  function getBorderColor(bg) {
    if (bg === "#d4edda") return "#3c763d";
    if (bg === "#f8d7da") return "#a94442";
    return "#ccc";
  }
  return (
    <div>
      <h4>{title}</h4>
      <table border="1" cellPadding="4" style={{ minWidth: 350, marginBottom: 10, borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Ilość</th>
            <th>Numer</th>
            <th>Wariant</th>
          </tr>
        </thead>
        <tbody>
          {parts.map(part => {
            const bg = getBgColor(part, compareParts);
            return (
              <tr
                key={part.numer}
                style={{
                  background: bg,
                  border: `2px solid ${getBorderColor(bg)}`
                }}
              >
                <td>{part.name}</td>
                <td>{part.ilosc}</td>
                <td>{part.numer}</td>
                <td>{part.variant || ""}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function PartsDiff({ oldParts, newParts, oldLabel, newLabel }) {
  const doZalozenia = getPartsToAdd(oldParts, newParts);
  const doZdjecia = getPartsToRemove(oldParts, newParts);
  return (
    <div>
      <h3>Porównanie: {oldLabel} → {newLabel}</h3>
      <div>
        <strong>Części do założenia:</strong>
        {doZalozenia.length > 0 ? (
          <ul>
            {doZalozenia.map(part => (
              <li key={part.numer}>
                {part.name} {part.variant ? `(${part.variant})` : ""} | ilość: {part.ilosc} | nr: {part.numer}
              </li>
            ))}
          </ul>
        ) : (
          <p>Brak części do założenia.</p>
        )}
      </div>
      <div>
        <strong>Części do zdjęcia:</strong>
        {doZdjecia.length > 0 ? (
          <ul>
            {doZdjecia.map(part => (
              <li key={part.numer}>
                {part.name} {part.variant ? `(${part.variant})` : ""} | ilość: {part.ilosc} | nr: {part.numer}
              </li>
            ))}
          </ul>
        ) : (
          <p>Brak części do zdjęcia.</p>
        )}
      </div>
    </div>
  );
}

function PreviewModal({ open, onClose, partsA, partsB, diameterA, diameterB }) {
  if (!open) return null;
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
    }}>
      <div style={{
        background: "#fff", padding: 32, borderRadius: 12, minWidth: 420, maxWidth: "90vw", maxHeight: "90vh", overflowY: "auto"
      }}>
        <h2 style={{ marginTop: 0 }}>Podsumowanie zmian</h2>
        <PartsDiff
          oldParts={partsA}
          newParts={partsB}
          oldLabel={`${diameterA} (A)`}
          newLabel={`${diameterB} (B)`}
        />
        <div style={{ textAlign: "right", marginTop: 24 }}>
          <button
            style={{
              padding: "8px 16px", background: "#1976d2", color: "#fff",
              border: "none", borderRadius: 4, cursor: "pointer", fontWeight: "bold"
            }}
            onClick={onClose}
          >
            Zamknij podgląd
          </button>
        </div>
      </div>
    </div>
  );
}

// --- MODAL ZARZĄDZANIA WARIANTAMI ---
function ManageVariantsModal({
  open, onClose, customVariants, setCustomVariants
}) {
  const [newName, setNewName] = useState("");
  const [newVariant, setNewVariant] = useState({});
  function handleChange(partName, value) {
    setNewVariant(prev => ({
      ...prev,
      [partName]: value
    }));
  }
  function handleSave() {
    if (!newName.trim()) return;
    setCustomVariants(prev => ({
      ...prev,
      [newName]: { ...newVariant }
    }));
    setNewName("");
    setNewVariant({});
  }
  if (!open) return null;
  const partsWithVariants = PARTS_CONFIG.filter(p => p.variants && !p.isOM);
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
    }}>
      <div style={{
        background: "#fff", padding: 32, borderRadius: 12, minWidth: 420, maxWidth: "90vw", maxHeight: "90vh", overflowY: "auto"
      }}>
        <h2 style={{ marginTop: 0 }}>Zarządzanie wariantami</h2>
        <div style={{ marginBottom: 16 }}>
          <strong>Dodaj nowy wariant:</strong>
          <div style={{ margin: "8px 0" }}>
            <input
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="Nazwa wariantu"
              style={{ padding: 6, borderRadius: 4, border: "1px solid #aaa", width: 200 }}
            />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            {partsWithVariants.map(part => (
              <label key={part.name}>
                {part.name}:&nbsp;
                <select
                  value={newVariant[part.name] || part.variants[0]}
                  onChange={e => handleChange(part.name, e.target.value)}
                >
                  {part.variants.map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </label>
            ))}
          </div>
          <button
            style={{
              marginTop: 12, padding: "6px 16px", background: "#388e3c", color: "#fff",
              border: "none", borderRadius: 4, cursor: "pointer", fontWeight: "bold"
            }}
            onClick={handleSave}
            disabled={!newName.trim()}
          >
            Zapisz wariant
          </button>
        </div>
        <div>
          <strong>Zapisane warianty:</strong>
          <ul>
            {Object.keys(customVariants).length === 0 && <li>Brak wariantów</li>}
            {Object.entries(customVariants).map(([name, v]) => (
              <li key={name}>
                <b>{name}</b>
                <span style={{ color: "#888", marginLeft: 8 }}>
                  {Object.entries(v).map(([k, val]) => `${k}: ${val}`).join(", ")}
                </span>
                <button
                  style={{
                    marginLeft: 12, color: "#fff", background: "#e53935",
                    border: "none", borderRadius: 4, cursor: "pointer", padding: "2px 8px"
                  }}
                  onClick={() => {
                    setCustomVariants(prev => {
                      const copy = { ...prev };
                      delete copy[name];
                      return copy;
                    });
                  }}
                >Usuń</button>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ textAlign: "right", marginTop: 24 }}>
          <button
            style={{
              padding: "8px 16px", background: "#1976d2", color: "#fff",
              border: "none", borderRadius: 4, cursor: "pointer", fontWeight: "bold"
            }}
            onClick={onClose}
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
}

// --- GŁÓWNY KOMPONENT ---
export default function App() {
  const [variants, setVariants] = useState(DEFAULT_VARIANTS);
  const [omSet, setOmSet] = useState(defaultOMs());
  const [diameterA, setDiameterA] = useState("DIA28");
  const [diameterB, setDiameterB] = useState("DIA28");
  const [showPreview, setShowPreview] = useState(false);
  const [membrana, setMembrana] = useState(false);
  const [manageModal, setManageModal] = useState(false);
  const [customVariants, setCustomVariants] = useState({});
  const [selectedCustomA, setSelectedCustomA] = useState("");
  const [selectedCustomB, setSelectedCustomB] = useState("");

  function handleCustomSelect(version, value) {
    if (!value) return;
    setVariants(prev => {
      const newVariants = { ...prev };
      if (version === "A") {
        newVariants.A = { ...newVariants.A, [diameterA]: { ...customVariants[value] } };
      } else {
        newVariants.B = { ...newVariants.B, [diameterB]: { ...customVariants[value] } };
      }
      return newVariants;
    });
    if (version === "A") setSelectedCustomA(value);
    if (version === "B") setSelectedCustomB(value);
  }

  const partsA = generatePartsTable(diameterA, variants.A, omSet.A[diameterA]);
  const partsB = generatePartsTable(diameterB, variants.B, omSet.B[diameterB]);

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h2>Porównanie części i wariantów</h2>
      <div style={{ marginBottom: 8 }}>
        <span style={{ background: "#d4edda", padding: "2px 8px", borderRadius: 4, marginRight: 8 }}>Zgodne</span>
        <span style={{ background: "#f8d7da", padding: "2px 8px", borderRadius: 4 }}>Różne</span>
      </div>
      <div style={{ margin: "12px 0" }}>
        <label>
          <input
            type="checkbox"
            checked={membrana}
            onChange={e => setMembrana(e.target.checked)}
          />
          &nbsp;Membrana zamontowana (po zaznaczeniu można wybrać OMy)
        </label>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>
          Wybierz średnicę (A):&nbsp;
          <select value={diameterA} onChange={e => setDiameterA(e.target.value)}>
            {DIAMETERS.map(dia => (
              <option key={dia} value={dia}>{dia}</option>
            ))}
          </select>
        </label>
        &nbsp;&nbsp;
        <label>
          Wybierz średnicę (B):&nbsp;
          <select value={diameterB} onChange={e => setDiameterB(e.target.value)}>
            {DIAMETERS.map(dia => (
              <option key={dia} value={dia}>{dia}</option>
            ))}
          </select>
        </label>
      </div>
      {/* Wybór niestandardowego wariantu */}
      <div style={{ marginBottom: 10 }}>
        <label>
          Wariant niestandardowy (A):&nbsp;
          <select
            value={selectedCustomA}
            onChange={e => handleCustomSelect("A", e.target.value)}
          >
            <option value="">-- wybierz --</option>
            {Object.keys(customVariants).map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </label>
        &nbsp;&nbsp;
        <label>
          Wariant niestandardowy (B):&nbsp;
          <select
            value={selectedCustomB}
            onChange={e => handleCustomSelect("B", e.target.value)}
          >
            <option value="">-- wybierz --</option>
            {Object.keys(customVariants).map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </label>
      </div>
      {/* Panel A */}
      <VariantsPanel
        version="A"
        diameter={diameterA}
        variants={variants}
        setVariants={setVariants}
      />
      <OMPanel
        version="A"
        diameter={diameterA}
        omSet={omSet}
        setOmSet={setOmSet}
        enabled={membrana}
      />
      {/* Panel B */}
      <VariantsPanel
        version="B"
        diameter={diameterB}
        variants={variants}
        setVariants={setVariants}
      />
      <OMPanel
        version="B"
        diameter={diameterB}
        omSet={omSet}
        setOmSet={setOmSet}
        enabled={membrana}
      />
      <div style={{ display: "flex", gap: 30 }}>
        <PartsTable title={`Części (${diameterA}, warianty A)`} parts={partsA} compareParts={partsB} />
        <PartsTable title={`Części (${diameterB}, warianty B)`} parts={partsB} compareParts={partsA} />
      </div>
      <PartsDiff
        oldParts={partsA}
        newParts={partsB}
        oldLabel={`${diameterA} (A)`}
        newLabel={`${diameterB} (B)`}
      />
      <PreviewModal
        open={showPreview}
        onClose={() => setShowPreview(false)}
        partsA={partsA}
        partsB={partsB}
        diameterA={diameterA}
        diameterB={diameterB}
      />
      <ManageVariantsModal
        open={manageModal}
        onClose={() => setManageModal(false)}
        customVariants={customVariants}
        setCustomVariants={setCustomVariants}
      />
      <div style={{ margin: "18px 0" }}>
        <button
          style={{
            padding: "8px 16px", background: "#1976d2", color: "#fff",
            border: "none", borderRadius: 4, cursor: "pointer", fontWeight: "bold", marginRight: 10
          }}
          onClick={() => setShowPreview(true)}
        >
          Podgląd do wydruku
        </button>
        <button
          style={{
            padding: "8px 16px", background: "#388e3c", color: "#fff",
            border: "none", borderRadius: 4, cursor: "pointer", fontWeight: "bold"
          }}
          onClick={() => setManageModal(true)}
        >
          Zarządzaj wariantami
        </button>
      </div>
    </div>
  );
}
