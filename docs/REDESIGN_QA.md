# Redesign QA Checklist — 1960 Mustang (procedural R3F)

Scope: verify the redesign of `Mustang.jsx` / `Scene.jsx` / `App.jsx` against
mustang-redesign-spec.md. Review-only — no code writes from QA; report findings back.

Run the app: `npm run dev`, then orbit the camera in the browser. Visual checks
are judged at the default 3/4 front camera and from a side view (orbit 90°).

## 1. Silhouette & proportions

- [ ] Overall size reads ~4.6 m long x 1.7 m wide x 1.3 m tall in world units.
- [ ] Long hood, short rear deck, fastback roofline (roof slopes continuously to the tail, no notchback step).
- [ ] From the side, the car reads as a car — one cohesive extruded body profile
      (`THREE.Shape` + `ExtrudeGeometry`), not stacked boxes like the old placeholder.
- [ ] Lower body sits above the wheels; body does not engulf them.

## 2. Detachable parts

Every item below should exist as its own named/positioned mesh, so parts can be
moved or hidden independently:

- [ ] Wheel arches or layered fenders over front and rear wheels.
- [ ] Chrome front grille with horizontal bars + pony emblem (extruded shape or cylinder+cone).
- [ ] Two round headlights (one per side, not a single bar).
- [ ] Front bumper and rear bumper.
- [ ] Taillights, exhaust tip.
- [ ] Hood center crease, trunk deck line.
- [ ] Door seam lines, side chrome strip, door handles (both sides).

## 3. Wheels & contact

- [ ] Exactly 4 wheels; dark tire + chrome hubcap each.
- [ ] Axle orientation correct: tire is a cylinder standing upright (axis along X), lying
      wheels (axis vertical = pancake) fail. Check from front and side.
- [ ] Tire touches the ground plane — rim bottom ~0 contact, no visible float or sink.
- [ ] Wheels clear the body/arch cutouts at full steering range if steered; track width
      matches left/right (no asymmetric positions).

## 4. Z-fighting

Orbit slowly around every seam and look for shimmer/noise where two surfaces are coplanar.
Known hot spots:

- [ ] Grille bars vs grille backing mesh (must not be coplanar like the old placeholder).
- [ ] Side chrome strip vs body panel.
- [ ] Glass panels vs body — windows must not be the same plane as the body surface.
- [ ] Left/right symmetric parts (bumpers, lights, wheels) overlapping at center or each other.
- [ ] Any body detail (seams, creases) lying exactly on the body shell surface.

## 5. Normals & geometry

- [ ] Extruded body shows no inverted/black faces — winding is correct.
- [ ] Bevelled edges are smooth-shaded where curved, hard where creased; no faceting artifacts
      on the round hood/roof surfaces.
- [ ] Windshield and side glass have a slight tint and do not self-intersect the roof.
- [ ] No seams/gaps where body panels meet (no see-through cracks at the extruded profile joints).

## 6. Materials

- [ ] Body: deep candy red, `meshPhysicalMaterial` with clearcoat; reads glossy, not flat.
- [ ] Chrome parts (grille, bumpers, hubcaps): metalness ~1, roughness ~0.15 — bright reflections.
- [ ] Glass: dark, transparent, subtle tint — background visible through windows.
- [ ] Tires: black, matte/rough.
- [ ] No missing materials (magenta/default-gray fallbacks) on any mesh.

## 7. Scene, lighting, camera

- [ ] Studio lighting present: ambient + key + fill + rim.
- [ ] Soft ground plane with subtle grid or shadow; car casts a shadow.
- [ ] Camera fov ~35, position ~[7, 3, 8], aimed at car center.
- [ ] OrbitControls: damping on, distance clamped, cannot pan/orbit below the ground plane.

## 8. Build & runtime

- [ ] `npm run build` exits 0.
- [ ] Dev server browser console is clean (no errors/warnings on load).
- [ ] No new dependencies: package.json unchanged from pre-redesign version.
- [ ] `Mustang` is exported as a named component that renders ONLY the car group
      (no Canvas/lights inside); default export still works if kept.

## 9. Screenshot check

- [ ] Capture a screenshot from the default camera (playwright/headless browser or OS grab).
- [ ] Silhouette matches the reference (https://sketchfab.com/3d-models/ford-mustang-gt3-78c40bf430c94e588136b1412247bcbb)
      at the same rough angle: stance, roof line, wheel positions.
- [ ] Attach screenshot to the review; file findings here or in the review comment.