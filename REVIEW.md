# Review Checklist

## Pre-merge

- [ ] All CI checks pass
- [ ] No console errors in production build
- [ ] `npm run build` completes successfully
- [ ] No TypeScript/ESLint warnings introduced
- [ ] Bundle size within budget
- [ ] All tests pass

## Code Quality

- [ ] No unused imports or dead code
- [ ] Consistent naming conventions
- [ ] Components follow React best practices
- [ ] Props properly typed (if TypeScript)
- [ ] No hardcoded values that should be configurable

## 3D/Rendering Specific

- [ ] No memory leaks in Three.js scene
- [ ] Proper disposal of geometries/materials
- [ ] Render loop cleaned up on unmount
- [ ] Performance: 60fps on target devices
- [ ] No z-fighting or visual artifacts

## Accessibility

- [ ] Semantic HTML structure
- [ ] ARIA labels where needed
- [ ] Keyboard navigation works
- [ ] Color contrast ratios met

## Documentation

- [ ] README updated if API changes
- [ ] Component props documented
- [ ] Complex logic has inline comments