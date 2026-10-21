// Darslar va ularning izohlari — inglizcha matn (uz: academy.ts / lesson-notes.ts, dars raqami bo'yicha)
import type { AcademyContent } from "./types";

export const lessons: AcademyContent["lessons"] = {
  // ───────── ANALYTICS ─────────
  1: {
    title: "Dashboard: how to track sales and analytics",
    summary: "Track the key sales metrics across all your marketplaces in one place.",
    points: [
      "View overall sales metrics",
      "Compare results across marketplaces",
      "Track order dynamics",
      "Analyze product-level metrics",
      "Spot sales growth and declines",
      "View data for any period you need",
    ],
  },
  2: {
    title: "How to track all your expenses",
    summary:
      "Understand not just how much you sold, but how much you spent and how much profit is left.",
    points: [
      "Operating expenses",
      "Marketplace commissions",
      "Logistics",
      "Advertising",
      "Storage costs",
      "Penalties and other expenses",
      "Each expense’s share of total costs",
    ],
  },
  3: {
    title: "How to identify your TOP products",
    summary: "Find out which products sell the most and bring in the most revenue.",
    points: [
      "Identify your best-selling products",
      "Compare sales results across products",
      "See which SKUs bring in the most orders",
      "Identify strong and weak products",
      "Make data-driven assortment decisions",
    ],
  },
  4: {
    title: "ABC analysis: which products bring in the most profit?",
    summary: "Split products into groups A, B and C based on their results.",
    points: [
      "A — products that drive most of your results",
      "B — average results",
      "C — a small share of overall results",
      "For each group: SKU count, GMV, sales, margin, expenses, returns and cancellations",
    ],
  },
  5: {
    title: "XYZ analysis: how to understand demand for your products",
    summary: "Split products into groups X, Y and Z based on how stable their sales are.",
    points: [
      "X — stable sales",
      "Y — fluctuating demand",
      "Z — unstable sales, hard to forecast",
      "Plan stock more accurately",
      "Reduce the risk of overstock and stockouts",
    ],
  },
  6: {
    title: "ABC × XYZ analysis: how to manage your products",
    summary:
      "Assess a product’s importance to your business and the stability of its demand together: 9 groups from AX to CZ.",
    points: [
      "ABC — importance to business results",
      "XYZ — demand stability",
      "Groups AX, AY, AZ, BX, BY, BZ, CX, CY, CZ",
      "GMV, sales, margin, expenses, returns and cancellations within each group",
    ],
  },
  7: {
    title: "How to enter operating expenses",
    summary:
      "Enter and configure your business’s operating expenses to see your real profit.",
    points: [
      "Tax rate",
      "Fixed monthly taxes",
      "Average cost per product",
      "Monthly staff costs",
      "More accurate margin and ROI calculations",
    ],
  },
  8: {
    title: "How to enter product cost prices",
    summary: "Upload cost prices to Robohub and see the real results of your sales.",
    points: [
      "Enter product cost prices",
      "Upload cost price data",
      "Why cost price matters",
      "Analyze revenue and expenses correctly",
      "Determine each product’s real results",
    ],
  },

  // ───────── ORDERS ─────────
  9: {
    title: "How to analyze order dynamics",
    summary:
      "Are orders growing or falling? Track the dynamics over any period.",
    points: [
      "Track the number of orders",
      "Dynamics for the selected period",
      "Where orders are coming from",
      "Spot growth and declines",
    ],
  },
  10: {
    title: "How to manage Yandex Market orders",
    summary:
      "Open, check and process Yandex Market orders in Robohub.",
    points: [
      "Where to find orders",
      "Open and check a new order",
      "Work with an order",
      "Track statuses",
    ],
  },
  11: {
    title: "How to process Wildberries orders",
    summary: "Process Wildberries orders right from your Robohub account.",
    points: [
      "View orders",
      "Check a new order",
      "Process an order",
      "Track the status",
    ],
  },
  12: {
    title: "How to process Uzum Market orders",
    summary: "Process Uzum Market orders right from your Robohub account.",
    points: [
      "View orders",
      "Check a new order",
      "Process an order",
      "Track the status",
    ],
  },
  13: {
    title: "How to create an FBO shipment",
    summary: "Create a shipment to send products to the marketplace warehouse.",
    points: [
      "Go to the FBO shipments section",
      "Create a new shipment",
      "Select products and quantities",
      "Check the details",
      "Manage ready shipments",
    ],
  },
  14: {
    title: "Uzum Market orders: managing order status",
    summary: "Manage the status of Uzum Market orders in the Orders section.",
    points: [
      "Go to the Orders section",
      "View Uzum Market orders",
      "Check the details",
      "Manage order status",
    ],
  },

  // ───────── PRODUCTS ─────────
  15: {
    title: "How to update prices",
    summary: "Change a product’s price and send the new price to the marketplace.",
    points: [
      "Go to the Products section",
      "Change a product’s price",
      "Enter the new price",
      "Send the price to the marketplace",
    ],
  },
  16: {
    title: "How to create a product card",
    summary: "Create a new product card and send it to the marketplace.",
    points: [
      "Create a new card",
      "Enter product details",
      "Fill in the price and other fields",
      "Save and send to the marketplace",
    ],
  },

  // ───────── WAREHOUSE ─────────
  17: {
    title: "Grouping warehouses (short)",
    summary: "A quick look at grouping warehouses.",
    points: [
      "Go to the Warehouses section",
      "View existing warehouses",
      "Split warehouses into groups",
    ],
  },
  18: {
    title: "How to group warehouses",
    summary:
      "Organize warehouses into groups and manage them neatly from one account.",
    points: [
      "Go to the “Warehouse” section",
      "View existing warehouses",
      "Split warehouses into groups",
      "Manage warehouse groups",
      "Work with grouped warehouses",
    ],
  },
  19: {
    title: "What is Missing and how to deal with it",
    summary: "View products with Missing status in the warehouse and work with them.",
    points: [
      "Go to the “Warehouse” section",
      "Open the Missing section",
      "View products with Missing status",
      "Check product details",
    ],
  },

  // ───────── MARKETING ─────────
  20: {
    title: "How to manage promo codes and the promotions calendar",
    summary: "Track marketplace promo codes and promotions from one account.",
    points: [
      "Go to the “Marketing” section",
      "View and manage promo codes",
      "Promotions calendar",
      "Promotion dates and terms",
    ],
  },
  21: {
    title: "How to work with Boost TOP",
    summary: "Manage your products with the Boost TOP feature.",
    points: [
      "Go to the “Marketing” section",
      "Open Boost TOP",
      "View Boost TOP data",
      "Manage products with Boost TOP",
    ],
  },

  // ───────── INTEGRATION ─────────
  22: {
    title: "How to connect Uzum Market",
    summary: "Connect your Uzum Market account to Robohub and activate the integration.",
    points: [
      "Go to the “Integration” section",
      "Select Uzum Market",
      "Connect your account",
      "Enter the integration details",
      "Check and activate the connection",
    ],
  },
  23: {
    title: "How to connect Wildberries",
    summary: "Connect your Wildberries account to Robohub and activate the integration.",
    points: [
      "Go to the “Integration” section",
      "Select Wildberries",
      "Connect your account",
      "Enter the integration details",
      "Check and activate the connection",
    ],
  },
  24: {
    title: "How to connect Yandex Market",
    summary: "Connect your Yandex Market account to Robohub and activate the integration.",
    points: [
      "Go to the “Integration” section",
      "Select Yandex Market",
      "Connect your account",
      "Enter the integration details",
      "Check and activate the connection",
    ],
  },
  25: {
    title: "How to connect Ozon",
    summary: "Connect your Ozon account to Robohub and activate the integration.",
    points: [
      "Go to the “Integration” section",
      "Select Ozon",
      "Connect your account",
      "Enter the integration details",
      "Check and activate the connection",
    ],
  },

  // ───────── COMMUNICATION ─────────
  26: {
    title: "How the Chat section works",
    summary: "Manage conversations with marketplace customers from one account.",
    points: [
      "Go to the “Chat” section",
      "View the chat list",
      "View conversations with customers",
      "Manage messages",
    ],
  },
  27: {
    title: "How automatic replies to reviews work",
    summary: "Reply to customer reviews automatically with the Auto-reply feature.",
    points: [
      "Go to the “Auto-reply” section",
      "View customer reviews",
      "Reply to reviews automatically",
      "Auto-reply settings",
    ],
  },

  // ───────── MANAGEMENT ─────────
  28: {
    title: "How the Documents section works",
    summary:
      "View and manage your marketplace documents from one account.",
    points: [
      "Go to the “Documents” section",
      "View the document list",
      "View document details",
      "Manage documents",
    ],
  },
  29: {
    title: "How to add roles for employees",
    summary: "Assign roles and access permissions to employees.",
    points: [
      "Go to the “Employees” section",
      "Open the Roles section",
      "Add a new role and name it",
      "Set the role’s permissions",
      "Manage roles",
    ],
  },
  30: {
    title: "Infographics: how to visualize your sales data",
    summary:
      "Visualize marketplace data with the Infographics feature in the Learning materials section.",
    points: [
      "Go to the Learning materials section",
      "Get to know Infographics",
      "Visualize marketplace data",
      "Understand your sales metrics",
    ],
  },
};

export const notes: AcademyContent["notes"] = {
  // ───────── ANALYTICS ─────────
  1: {
    concept:
      "The Dashboard is a page that brings your business’s key metrics together on one screen. Total sales, order count and each marketplace’s results are visible at a glance, and you can pick any period to compare metrics.",
    why: "Opening four marketplace accounts separately and adding up the numbers by hand takes a lot of time and leads to mistakes. The Dashboard instantly shows where sales are growing and where they are falling — so you make decisions faster.",
    tip: "Start every day with the Dashboard: comparing against the previous period helps you catch sharp changes early.",
  },
  2: {
    concept:
      "Expense analysis shows where your sales revenue goes: marketplace commissions, logistics, advertising, storage, penalties and operating expenses. Each expense’s share of total costs is shown separately.",
    why: "High sales don’t automatically mean high profit. Once you know which expense eats the most money, you can optimize exactly that and grow your net profit.",
    tip: "Start with the 2–3 biggest expenses — that’s where you can improve profit fastest.",
  },
  3: {
    concept:
      "TOP products is a list of the SKUs that sell the most and bring in the most revenue. Products are compared by sales results, so strong and weak items stand out clearly.",
    why: "Usually a small group of products generates most of the revenue. Knowing them lets you restock on time and make advertising and assortment decisions based on data, not guesswork.",
  },
  4: {
    concept:
      "ABC analysis splits products into three groups by their contribution to business results: A — products that drive most of the results, B — average results, C — products with a small share of the total. For each group you see SKU count, GMV, sales, margin, expenses, returns and cancellations.",
    why: "You can’t give every product equal attention. ABC shows which products “carry” your business: group A should always be in stock, while group C can be reconsidered or removed from the assortment.",
  },
  5: {
    concept:
      "XYZ analysis groups products by demand stability: X — stable sales, Y — fluctuating demand, Z — unstable sales that are hard to forecast.",
    why: "Products with stable demand can be planned precisely in advance, while unstable ones call for caution. This helps you plan stock more accurately and reduce the risk of overstock and stockouts.",
  },
  6: {
    concept:
      "ABC × XYZ combines the two analyses: a product’s importance to the business (ABC) and its demand stability (XYZ) are assessed together. The result is 9 groups from AX to CZ, each showing GMV, sales, margin and expenses.",
    why: "Each group needs its own strategy. For example, AX is an important, stable product that should always be well stocked; CZ has a small share and unstable demand, so you shouldn’t tie up extra money in it.",
    tip: "Look at the AX, AY and CZ groups first — that’s where your most important and riskiest products are.",
  },
  7: {
    concept:
      "Operating expenses are the money you spend every month to run your business beyond product cost price and marketplace commissions: tax rate, fixed monthly taxes, staff salaries and the average cost per product.",
    why: "If these expenses aren’t accounted for, your profit looks bigger than it really is. Once you enter them in Robohub, margin and ROI are calculated from real numbers — and it becomes clear which products actually make a profit.",
    tip: "Enter your expenses in full once and update them when they change — that way your reports stay accurate.",
  },
  8: {
    concept:
      "Cost price is what you paid to buy or produce a product. In Robohub you can enter the cost price for each product or upload it as a list.",
    why: "Without cost price, the system only sees revenue, not profit. Once cost prices are entered, you see each product’s real result — not how much it sold, but how much money it actually left you.",
  },

  // ───────── ORDERS ─────────
  9: {
    concept:
      "Order dynamics show how the number of orders changed over the selected period: whether it’s growing or falling, and which marketplaces the orders come from.",
    why: "Dynamics reveal a problem or an opportunity before the numbers change dramatically. If you catch a decline early, you’ll find the cause — price, stock or competition — in time.",
  },
  10: {
    concept:
      "Orders from Yandex Market appear in your Robohub account: this is where you open a new order, check its contents, work with it and track its status.",
    why: "You work with all orders in one place without logging into the marketplace account separately — saving time and making sure no order slips through the cracks.",
  },
  11: {
    concept:
      "Wildberries orders are collected in your Robohub account: viewing, checking and processing new orders and tracking their status all happen in one place.",
    why: "If you sell on several marketplaces, tracking orders in each account separately is hard. With everything in one window, orders are processed faster and with fewer mistakes.",
  },
  12: {
    concept:
      "Orders from Uzum Market appear in your Robohub account — you can check them, process them and track their status.",
    why: "The faster an order is processed, the sooner the customer receives it — and that directly affects your rating and reviews. A single account speeds up this process.",
  },
  13: {
    concept:
      "FBO (Fulfillment by Operator) is a model where your products are stored in the marketplace’s warehouse and the marketplace itself delivers the orders. A shipment is a request that specifies which products and how many units are sent to the marketplace warehouse.",
    why: "When a shipment is set up correctly, products reach the warehouse on time and sales don’t stall. In Robohub you can select products and quantities, check the details and manage ready shipments.",
    tip: "Before creating a shipment, check your stock and ABC/XYZ results — send the most needed products first.",
  },
  14: {
    concept:
      "Order status shows which stage an order is at. In the Orders section you can view Uzum Market orders, check their details and manage their status.",
    why: "When statuses are updated on time, delays and cancellations go down, and you always know exactly where each order stands.",
  },

  // ───────── PRODUCTS ─────────
  15: {
    concept:
      "Price update means changing a product’s price in Robohub and sending the new price directly to the marketplace.",
    why: "Changing prices in each marketplace account separately takes time and leads to mistakes. Updating from one place lets you respond quickly to promotions, seasons or competitors.",
    tip: "Before changing a price, make sure cost prices and expenses are entered — that way you’ll know your margin at the new price.",
  },
  16: {
    concept:
      "A product card is the page that presents your product to shoppers on the marketplace: its name, details, price and other fields. In Robohub you can create a new card, fill it in, save it and send it to the marketplace.",
    why: "A well-filled card ranks better in search and convinces shoppers faster. Creating cards from one place saves time.",
  },

  // ───────── WAREHOUSE ─────────
  17: {
    concept: "Warehouse grouping means combining several warehouses into groups that suit you. This lesson is a short overview of the process.",
    why: "When you have many warehouses, viewing them in groups makes stock management much easier. The detailed version is in the next lesson.",
  },
  18: {
    concept:
      "Warehouse groups combine several warehouses (for example, those in one city or of one marketplace) into a single group that you work with from one account.",
    why: "As the number of warehouses grows, tracking stock in each one separately gets harder. Groups make it easier to see overall stock and plan shipments.",
  },
  19: {
    concept:
      "Missing refers to products that are listed in the warehouse records but weren’t actually found, or whose status is unclear. In Robohub they appear in a separate section where you can check their details.",
    why: "A product with Missing status is money that isn’t selling. Identifying these items in time and resolving the issue with the marketplace reduces losses.",
    tip: "Check the Missing section regularly — the earlier you notice an issue, the easier it is to resolve.",
  },

  // ───────── MARKETING ─────────
  20: {
    concept:
      "Promo codes and the promotions calendar show marketplace discount codes and promotions, along with their dates and terms, in one place.",
    why: "When you know when each promotion starts and ends, you can prepare stock and prices in advance — and get the most out of the promotion.",
  },
  21: {
    concept: "Boost TOP is a feature that helps push your products higher in marketplace search. In Robohub you can view its data and manage your products.",
    why: "Shoppers see products at the top of search results more often and buy them more. By tracking Boost TOP results, you can focus on the most effective products.",
  },

  // ───────── INTEGRATION ─────────
  22: {
    concept: "Integration links your Uzum Market seller account to Robohub. Once connected, data starts flowing into your Robohub account.",
    why: "This is the first step in working with Robohub: orders, products and analytics only work after this connection is set up.",
    tip: "After connecting, check that the connection is active — that way your data keeps flowing without interruptions.",
  },
  23: {
    concept: "Integration links your Wildberries seller account to Robohub. You enter the integration details, then the connection is checked and activated.",
    why: "Once connected, your Wildberries orders, products and analytics appear in one account alongside your other marketplaces.",
  },
  24: {
    concept: "Integration links your Yandex Market seller account to Robohub. You enter the integration details, then the connection is checked and activated.",
    why: "Once connected, your Yandex Market orders and data are managed in one place together with your other marketplaces.",
  },
  25: {
    concept: "Integration links your Ozon seller account to Robohub. You enter the integration details, then the connection is checked and activated.",
    why: "Once connected, your Ozon sales are added to your overall analytics and order list too — all marketplaces in one account.",
  },

  // ───────── COMMUNICATION ─────────
  26: {
    concept: "Chat is the section that brings your conversations with marketplace customers together in one place: the chat list, conversations and message management.",
    why: "A quick answer to a customer’s question means a sale and a good review. With all chats in one place, no message goes unanswered.",
  },
  27: {
    concept: "Auto-reply is a feature that automatically responds to customer reviews. This section is where you view reviews and change auto-reply settings.",
    why: "Writing a reply to every review by hand takes a lot of time. Auto-reply shows every customer attention and supports your store’s reputation.",
    tip: "For negative reviews, also reply personally after the auto-reply — the customer will notice the attention.",
  },

  // ───────── MANAGEMENT ─────────
  28: {
    concept: "The Documents section gathers the list of documents from your marketplace work, along with their details, in one account.",
    why: "No need to search for documents in each marketplace account — you find the one you need quickly and keep everything under control.",
  },
  29: {
    concept: "Roles are sets of access permissions given to employees. You add a new role, name it, assign the permissions it needs and manage your roles.",
    why: "Each employee only sees the sections they need: work stays organized and sensitive data stays safe.",
    tip: "Create roles by job position — when a new employee joins, just assign them a ready-made role.",
  },
  30: {
    concept: "Infographics is a feature in the Learning materials section: marketplace data and sales metrics are shown visually instead of in tables.",
    why: "Charts and visuals help you understand numbers faster — trends and changes are visible at a glance.",
  },
};
