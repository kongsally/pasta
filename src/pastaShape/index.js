import BasePasta from "./basePasta.js";
import ConchiglioniRigati from "./conchiglioniRigati.js";
import Farfalle from "./farfalle.js";
import FusilliAlFerretto from "./fusilliAlFerretto.js";
import FusilliLunghiBucati from "./fusilliLunghiBucati.js";
import Gemelli from "./gemelli.js";
import GiglioOndulato from "./giglioOndulato.js";
import Gnocchi from "./gnocchi.js";
import PenneRigate from "./penneRigate.js";
import Radiatori from "./radiatori.js";
import RavioliQuadrati from "./ravioliQuadrati.js";
import Rigatoni from "./rigatoni.js";
import Rombi from "./rombi.js";
import Strozzapreti from "./strozzapreti.js";
import Taglierini from "./taglierini.js";

const pastaFactories = {
  ConchiglioniRigati: () => new ConchiglioniRigati(),
  Farfalle: () => new Farfalle(),
  FusilliAlFerretto: () => new FusilliAlFerretto(),
  FusilliLunghiBucati: () => new FusilliLunghiBucati(),
  Gemelli: () => Gemelli(),
  GiglioOndulato: () => GiglioOndulato(),
  Gnocchi: () => new Gnocchi(),
  PenneRigate: () => PenneRigate(),
  Radiatori: () => Radiatori(),
  RavioliQuadrati: () => RavioliQuadrati(),
  Rigatoni: () => new Rigatoni(),
  Rombi: () => Rombi(),
  Strozzapreti: () => Strozzapreti(),
  Taglierini: () => Taglierini()
};

const pastaNames = Object.freeze(Object.keys(pastaFactories));

function PastaGeometry(name) {
  const factory = pastaFactories[name];

  if (!factory) {
    throw new Error(`Unknown pasta shape: ${name}. Available shapes: ${pastaNames.join(", ")}`);
  }

  return factory();
}

export {
  BasePasta,
  ConchiglioniRigati,
  Farfalle,
  FusilliAlFerretto,
  FusilliLunghiBucati,
  Gemelli,
  GiglioOndulato,
  Gnocchi,
  PenneRigate,
  Radiatori,
  RavioliQuadrati,
  Rigatoni,
  Rombi,
  Strozzapreti,
  Taglierini,
  PastaGeometry,
  pastaFactories,
  pastaNames
};
