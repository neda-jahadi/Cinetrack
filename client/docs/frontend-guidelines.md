## Layout & Spacing

### General principles

Spacing belongs to the container that manages the relationship between elements.

Prefer `gap` on `flex` and `grid` containers instead of adding `mt-*` and
`mb-*` to individual children.

Use `mt-*` / `mb-*` when the spacing is genuinely a one-off relationship and
using `gap` would make the structure less clear.

Typography classes such as `section-title` and `section-subtitle` should define
typography only. They should not contain surrounding layout margins.

### Standard spacing

| Relationship                    | Tailwind            |
| ------------------------------- | ------------------- |
| Small related elements          | `gap-2`             |
| Normal related elements         | `gap-4`             |
| Grid/card spacing               | `gap-6`             |
| Heading group → section content | `gap-8` or `gap-10` |
| Major page section padding      | `py-16 md:py-20`    |
| Default card padding            | `p-6`               |

Use these values as defaults. Deviate when the design or component genuinely
requires different spacing rather than introducing arbitrary values.

---

## Section

`Section` represents a major page-level content band.

### Responsibilities

- Provides standard vertical section spacing.
- Controls the full-width section background/surface.
- Does not control the maximum content width.
- Does not control the internal layout of its content.

### Default spacing

```txt
py-16 md:py-20
```

### Variants

- `default` — standard page background (`bg-background`)
- `muted` — subtle section separation (`bg-surface-muted`)
- `primary` — strong branded section (`bg-primary text-primary-foreground`)

Use `Section` for major page sections. Do not replace every semantic HTML
`<section>` with this component.

Example:

```tsx
<Section variant="muted">
  <Container>...</Container>
</Section>
```

---

## Container

`Container` controls horizontal page layout.

### Responsibilities

- Centers page content.
- Provides responsive horizontal gutters.
- Sets the maximum content width.
- Does not provide vertical section spacing.
- Does not control section backgrounds.
- Does not impose an internal flex/grid layout.

### Sizes

| Size      | Width              |
| --------- | ------------------ |
| `narrow`  | `max-w-3xl`        |
| `default` | `max-w-7xl`        |
| `wide`    | `max-w-screen-2xl` |
| `full`    | `max-w-none`       |

`Container` accepts `className`, so page-specific layout can be applied directly
when appropriate:

```tsx
<Container className="flex flex-col gap-10">...</Container>
```

Do not add `flex`, `grid`, or a default `gap` to the `Container` component
itself. Different pages may require different internal layouts.

---

## Internal section layout

Use the nearest parent layout to control spacing between sibling elements.

For a common section containing a heading, content, and action:

```tsx
<Section>
  <Container className="flex flex-col gap-10">
    <div className="flex flex-col gap-2 text-center">
      <h2 className="section-title">Latest opportunities</h2>
      <p className="section-subtitle">
        Fresh opportunities from companies looking for talent.
      </p>
    </div>

    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">...</div>

    <ButtonLink to="/jobs">Browse jobs</ButtonLink>
  </Container>
</Section>
```

Here:

- `gap-2` controls title → subtitle spacing.
- `gap-10` controls heading group → grid → action spacing.
- `gap-6` controls spacing between grid items.

Do not add unnecessary margins such as:

```tsx
<div className="mt-8 mb-8 grid gap-6">
```

when the parent already defines that relationship using `gap`.

### Rule of thumb

**Section** → vertical page rhythm and full-width surface.

**Container** → horizontal width and gutters.

**Flex/Grid parent** → layout and spacing between its children.

**Individual component** → its own internal spacing.

Prefer parent `gap` for structured sibling relationships; use individual
margins only when they express a genuine one-off layout need.
