# Task 1  
Open this prototype: https://www.figma.com/proto/oOzlLQY8ryavtvZQpvgHLZ/Nexgi-Landing-page?node-id=297-1097&viewport=-17637%2C-1972%2C0.49&t=tWRWvpqpGQpchH1i-1&scaling=min-zoom&content-scaling=fixed&page-id=2%3A180 
1. Section 1: Hero Section (ignore navigation)
2. Section 2: Results, not stories

## UAT Section 1
1. Design must be fully responsive on 1920, 1440, 1024, 768, 420, 320px devices
2. Video must be auto-play
3. Section must be optimized as per page speed load. Video is of 10 MB, but it shouldn't block the page load.
4. CTA "See Our Impact -->" bg color must be controlled via common primary-color variable and whereever we are using the primary color, this variable must be used.
5. "Transform your ... main heading must be H1"
6. Heading Fonts must be https://fonts.google.com/specimen/Source+Serif+4 
7. Body font must be https://fonts.google.com/specimen/Funnel+Sans 
8. Design must be ditto same like prototype, any minor issue related to margin & padding, font-size, weight will be part of marks deduction.


## UAT Section 2: 
1. Design must be fully responsive on 1920, 1440, 1024, 768, 420, 320px devices
2. Upto 1440, there should be 3.5 slides visible. 
3. Upto 768px there should be 2.5 slides visible.
4. rest 1.5 slides should be visible. 
5. On mobile user must be able to swipe via thumb.
6. Fonts are common as section 1
7. Section heading must be H2


# Common
1. Assets are given in assets folder. 
2. You have to paste your task code into task-1 folder
3. Create PR as your name-task-1
4. You have to build section 1 in vanilla CSS
5. You have to build section 2 using tailwind. 
6. You have to make sure both sections must be untouched due to different aproach on same page.
7. Page must follow speed optimisation. 


# Task 2
This task 2 main goal is your English comprehension (the ability to read, process, and completely understand the meaning of written text) + debugging skills. You are not allowed to ask your doubts, just read and do whatever you find best possible assumption.

## Rules
- **Vanilla CSS and JavaScript only.** No frameworks, no libraries, no jQuery, no Tailwind or Bootstrap. This mirrors how we work on Shopify themes.
- **Do not edit `js/api.js`.** It simulates a real server: requests are slow, different endpoints respond at different speeds, and some requests fail. Your code has to handle that.
- You may edit `index.html`, `css/styles.css` and `js/main.js`.
- **AI tools are not allowed.**
- Fix the root cause. Hiding a symptom (for example `overflow: hidden` on the body, `!important` everywhere, or `setTimeout` to "wait a bit") does not count as a fix.
- **Time limit: 1 hours.** It is fine not to finish everything. A few issues fixed properly beats all issues patched badly.

## How to test

- Desktop: Chrome at full width (1280px or wider).
- Mobile: DevTools device toolbar at 390px wide (iPhone 12/13/14 size).
- Useful test emails for the newsletter: `taken@example.com` (already subscribed), and any other email (new subscriber).


## Issues

### A. Layout issues
**A1. Header items are bunched together**
What you see: On desktop, the logo, navigation and cart are crowded into the middle of the header, and the text sits at the top of the bar instead of being vertically centred. On mobile the menu button, logo and cart are also squeezed together.
Expected: Logo on the left, nav in the middle, cart on the right, all vertically centred. On mobile: menu button, logo and cart spread across the bar, all vertically centred.


**A2. Product grid overflows**
What you see: On desktop below 1024, the fourth product card pokes out past the right edge of the content area. On mobile (390px) the page scrolls sideways and the cards are cut off.
Expected: The grid fills the available width on every screen size: 4 columns on wide desktop, fewer on tablet, 1 column on mobile. No horizontal scroll at any width.

**A3. "Add to cart" buttons are at different heights**
What you see: Product descriptions have different lengths, so the price and "Add to cart" button end up at a different height on every card in the same row.
Expected: Cards in a row are the same height, and the price/button row sits at the bottom of every card, lined up across the row.

### B. AJAX and loading states

**B1. No feedback while products load**
What you see: Clicking a filter or "Load more" gives no sign that anything is happening. The old products just sit there until new ones suddenly appear.
Expected: The user can clearly see something is loading, and can't trigger the same action twice while it is in progress.

**B2. Clicking "Load more" quickly breaks the list**
What you see: Double click or rapidly click "Load more". Pages are skipped and products go missing.
Expected: Each click loads the next page exactly once, in order.

**B3. Filters show the wrong products**
What you see: Click "Seating" and then quickly click "Storage". The Storage button is highlighted, but a moment later the grid shows Seating products.
Expected: The grid always matches the filter that is currently selected, no matter how fast the user clicks.

**B4. Filters show nothing after using "Load more"**
What you see: Click "Load more" once, then click "Seating". The grid becomes empty.
Expected: Choosing a filter always starts from the first page of that category. If a category ever has no products, show a friendly message instead of a blank space.

**B5. Load more fails silently**
What you see: With "All" selected, click "Load more" until the third page. That request fails (check the Console). Nothing on the page tells the user, and the list just stops.
Expected: The user sees that loading failed and can retry. A retry should load the correct page, not skip it.

**B6. "Load more" never goes away**
What you see: After all 10 products are shown, the "Load more" button is still visible and clicking it does nothing. The same happens on categories that have only 3 or 4 products.
Expected: The button is hidden when there is nothing more to load. The API already tells you this.

**B7. Newsletter always says "Thanks"**
What you see: Subscribe with `taken@example.com`. The page reloads (look at the URL) and the success message never makes sense for this email.
Expected: The form submits without reloading the page, shows a loading state on the button while waiting, and shows the actual message from the server (success or error). The email field is only cleared on success.

### C. Animation Issues

**C1. Product cards make the page jump on hover**
What you see: Hovering first card makes it rise, but the cards next to it and the "Load more" button below also shift. The motion is not smooth.
Expected: Only the hovered card moves up with a smooth lift and shadow. Nothing around it moves.

**C2. Mobile menu does not animate**
What you see: On mobile, the menu snaps open and closed instantly, even though a transition is written in the CSS.
Expected: The menu slides open and closed smoothly, in both directions.

**C3. Toast notification misbehaves**
What you see: Add a product to the cart. The toast slides in, but vanishes abruptly with no exit animation. Add two products a couple of seconds apart and the second toast disappears far too early.
Expected: The toast animates in and out smoothly, and every toast stays on screen for its full duration (about 2.5 seconds after the latest one appears).

### D. Events

**D1. FAQ accordion does not open**
What you see: Clicking any FAQ question does nothing. There is an error in the Console.
Expected: Clicking a question opens its answer. Only one answer is open at a time. Clicking an open question closes it. Screen readers can tell whether each question is expanded or collapsed.

**D2. "Add to cart" adds the wrong quantity**
What you see: Click "Load more", then click "Add to cart" once on one of the first four products. The cart count goes up by 2 (or more, the more pages you load). But newely added product works well as they add 1 quantity.
Expected: One click always adds exactly one item, on every card, including cards added by filters and "Load more". Rapid clicking on the same button should not add multiple items while a request is still in progress.

**D3. Mobile menu does not close**
What you see: On mobile, open the menu and tap a link. The page scrolls but the menu stays open over the content. Pressing Escape does nothing. Screen readers are always told the menu is collapsed.
Expected: The menu closes when a link is tapped and when Escape is pressed. The toggle button's `aria-expanded` always matches the menu's real state.

---

## Bonus (optional, only if you have time)

- Anything else you notice that is broken or could be better. List it in your notes but don't fix it.

## What to submit

1. A `NOTES.md` file in the root with one short entry per issue, for example:
2. Submit Pr name-task-2-fixes

```
A1. Header bunched together
Cause: ...
Fix: ...
```

If you didn't fix an issue, write what you found and what you would try next. Honest notes score better than confident wrong ones.

