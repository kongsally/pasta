# Sally's Pasta Palace :woman_cook:
Welcome to Sally's pasta palace where you can find a fine selection of pasta shapes implemented in three.js.

## Install

```bash
npm install @kongsally/pasta three
```

## Usage

```js
import * as THREE from "three";
import { PastaGeometry, pastaNames, Gnocchi } from "@kongsally/pasta";

const scene = new THREE.Scene();

const rigatoni = PastaGeometry("Rigatoni");
rigatoni.scale(0.01, 0.01, 0.01);
scene.add(new THREE.Mesh(rigatoni, new THREE.MeshNormalMaterial()));

const gnocchi = new Gnocchi();
gnocchi.translate(2, 0, 0);
scene.add(new THREE.Mesh(gnocchi, new THREE.MeshNormalMaterial()));

console.log(pastaNames);
```

`PastaGeometry(name)` always returns a `THREE.BufferGeometry`.

Supported names:

- `ConchiglioniRigati`
- `Farfalle`
- `FusilliAlFerretto`
- `FusilliLunghiBucati`
- `Gemelli`
- `GiglioOndulato`
- `Gnocchi`
- `PenneRigate`
- `Radiatori`
- `RavioliQuadrati`
- `Rigatoni`
- `Rombi`
- `Strozzapreti`
- `Taglierini`

![alt text](https://github.com/kongsally/pasta/blob/main/media/pasta_pals_0.gif?raw=true)

:warning: May contain essence of friends made at the Recurse Center :warning:
- Penne Rigate : Mark Dawson
- Tagliereni : Sophie Shears
- Strozzapreti : Daniel Manesh
- Rombi : Justin Reppert
- Giglio Ondulato : Ricky Pai
- Fusilli Al Ferretto : Sean Chen
- Fusilli Lunghi Bucati : Aaryan Porwal
- Gemelli : Alya Amarsy
- Radiatori : Evan Schwartz
- Ravioli Quadrati : Janet Kingori
- Farfalle : Linna Li
- Conchiglioni Rigati : Adam Kelly
- Gnocchi : Hannah Wolff
- Rigatoni : Nicholas Montaño
