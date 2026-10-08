*Reference Document: BRD - Surplus Food MVP Decision Brief for Design.docx*

# Surplus Food BRD MVP

## Summary
The MVP lets home cooks post surplus food that nearby neighbors can claim and pick up, right away or in a time slot the poster offers. It is built to prove one thing first: supply and demand can meet in time, in one neighborhood.

**Problem.** Home cooks regularly end up with good food they cannot use before it spoils. Budget-conscious neighbors blocks away have no fast way to know it exists. The gap is not a lack of surplus or demand. It is the lack of a low-friction way to surface "available now, here, for the next hour" and get it claimed in time.

**Why it matters.** Food waste is environmentally wasteful, costly for households, and a missed chance to build local, trust-based community.

## Outcome and success metric
At least 20% of listings offered for immediate pickup are claimed and picked up within 60 minutes of posting, in one launch neighborhood, within the first 4 to 6 weeks.

This is a behavior outcome, not a feature output. It tests the riskiest assumption first: that nearby people will claim and collect food fast enough. Whether the AI features add value comes after that.

Only listings offered for immediate pickup count toward the metric. Scheduled-slot listings are tracked by claim rate and pickup completion. The 20% target is only meaningful if enough nearby claimers exist when listings go up (see open questions).

## Scope decisions
Three decisions are settled. They shape every screen design needs to draw.

| Decision | What we chose | Tradeoff accepted |
| :--- | :--- | :--- |
| **Who posts** | Home cooks only. Restaurants are out of the MVP. | No fixed closing time, so supply is less predictable. Food safety is an MVP concern, not a later one. |
| **Listing type** | Listings must support scheduled pickup slots: the poster offers a time or range, and the claimer picks one.<br><br>Listings must also support pickup at any time | |
| **Safety approach** | Clear rules and required confirmations. | No early learning from AI flagging, and no reputation score until there are enough pickups. |

## Safety rules for every listing
* The poster gives the food's expiration date.
* For unpackaged food, the poster states how long it has been in the house.
* Prepared meals must have been made no more than 3 days ago.
* The poster confirms cook time and allergens.
* The claimer acknowledges the risk before claiming.
* Both poster and claimer have phone-verified accounts.

## Draft feature prioritization
The core claim loop is Must. AI features are mostly Later, because the metric depends on listings being claimed fast, not on smarter matching. "Decided" rows come from our discussion. "Proposed" rows are my recommendation and still need your confirmation.

| Feature | Priority | Why |
| :--- | :--- | :--- |
| **Create a listing** with the required safety fields and pickup slots (a time or range) | Must | The supply side of the metric. Safety fields are non-negotiable for home cooks. |
| **Food nearby** | Must | The user should be able to check food nearby and access their details about location, and the donor's WhatsApp, to align on when they should pickup the food |
| **Sign up with phone verification** for posters and claimers | Must | Basic accountability while there is no reputation score. |
| **Claim flow** with risk acknowledgment | Must | The claim is the metric's first event. |
| **Nearby feed** of live listings with the distance | Must | So people can actually get food |
| **Push notification** for new nearby listings | Must | Without it, claimers will not see a 60-minute window in time. |
| **Push notifications** for donations claimed | Must | So claimer and donor can know who's interested and if the food is still available |
| **Notifications page** on the app | Must | So users can read past notifications |
| **Pickup handoff:** address after claim, contact, mark as picked up. Both donor and claimer can mark the food as picked up | Must | "Picked up" is the metric's second event, so it has to be recorded. |
| **Auto-close** of expired or claimed listings | Must | Keeps the feed trustworthy. |
| **Refrigerations** | Must | Posters must confirm that prepared meals were kept refrigerated to list them |
| **AI listing from a photo** | Should | Cuts posting effort. AI may fill in the description and quantity, but the poster enters expiration and cook time. |
| **AI image generation** | Should | So images are appealing |
| **Smart matching** | Later | At launch, a simple distance and dietary filter is enough. |
| **Reputation and trust score** | Later | Needs pickup history first. Rules cover safety for now. |
| **Demand prediction** | Out | Home cook supply has no regular rhythm to predict. |

## Assumptions and risks
If any of these is wrong, the plan changes. Each has a signal to watch in the first weeks.

| Assumption or risk | If it is wrong | Signal to watch |
| :--- | :--- | :--- |
| **Home cooks will keep posting** after the first few listings | Supply dries up, and claimers leave | Posters who list again in weeks 2 and 3 |
| **The required safety fields** do not make posting too slow | Posters abandon the listing flow | Time to complete a listing, and drop-off per step |
| **Claimers who claim will show up** | Food is claimed but wasted | Pickup completion rate among claimed listings |
| **Meals up to 3 days old** are acceptable and safe enough | A safety incident, or low claim rate on older food | Claim rate by food age, and any safety reports |
| **Sharing home-prepared food is allowed** under local rules | Legal exposure for posters and the product | Check local food-sharing rules before launch |

## What design should do first
Start with the flows that produce the metric's two events, claimed and picked up. Every screen should make three things clear at a glance: what is available, how far away it is, and how much time is left.

1. **Post a listing.** The poster completes the required safety fields quickly and offers a pickup time or range. The hard design problem is keeping this short while the fields stay mandatory.
2. **Browse and claim.** A nearby feed with a countdown, the food's age and allergens visible, and the risk acknowledgment at the moment of claiming.
3. **Pickup handoff.** How the claimer picks a slot, what they see after claiming, what the poster sees, and how a pickup is confirmed.
4. **Onboarding and phone verification** for both roles, with as little friction as possible.
5. **Edge states.** Listing expired, already claimed, claimer no-show, and food that fails the 3-day rule.

*Resolve the open questions on launch area, window length, and pickup confirmation before final designs of flows 1 to 3.*