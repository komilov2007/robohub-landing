// Mavzular va "Boshlang'ich yo'l" — inglizcha matn (uz: academy.ts, mavzu slug'i bo'yicha)
import type { AcademyContent } from "./types";

export const topics: AcademyContent["topics"] = {
  analytics: {
    name: "Analytics",
    short: "Sales, expenses, cost price and ABC/XYZ analysis",
    hero: {
      title: "Sales, expenses and profit —",
      highlight: "in one dashboard",
      subtitle:
        "Track key metrics across every marketplace in one place instead of pulling them together from separate seller accounts.",
      bullets: [
        "Sales and order trends",
        "Real results with expenses and cost price factored in",
        "ABC, XYZ and ABC × XYZ analysis",
      ],
    },
    problem: {
      title: "Knowing how much you sold isn’t enough",
      text: "A product sold for 200,000 UZS — that doesn’t mean 200,000 UZS in profit. Unless commission, logistics, advertising, cost price and operating expenses are accounted for, you can’t see your real result.",
    },
    solution: {
      title: "Robohub calculates it all in one place",
      text: "Sales, expenses, cost price and operating expenses in a single analytics view. You can also see which products are bringing in profit and how stable their demand is.",
    },
    flow: [
      "Sales data comes in from the marketplaces",
      "You enter cost price and operating expenses",
      "The Dashboard shows real profit and TOP products",
    ],
    features: [
      {
        title: "Dashboard",
        text: "Total sales, marketplace comparison and trends over time.",
      },
      {
        title: "Expense breakdown",
        text: "The share of commission, logistics, advertising, storage and penalties.",
      },
      {
        title: "TOP products",
        text: "Your best-selling and slowest-moving SKUs.",
      },
      {
        title: "ABC × XYZ",
        text: "9 groups based on profit and demand stability.",
      },
    ],
    steps: [
      {
        title: "Enter cost price",
        text: "Upload cost prices for your products (lesson 8).",
      },
      {
        title: "Enter operating expenses",
        text: "Taxes, staff and other monthly expenses (lesson 7).",
      },
      {
        title: "Open the Dashboard",
        text: "Pick a period and review your metrics (lesson 1).",
      },
      {
        title: "Analyze your products",
        text: "Make decisions based on TOP, ABC and XYZ (lessons 3–6).",
      },
    ],
    faqs: [
      {
        q: "When should I enter cost price and operating expenses?",
        a: "Before you start using analytics — it’s the very first step. To calculate profit, Robohub subtracts all expenses from sales revenue: if cost price or operating expenses are missing, profit, margin and ROI will come out much higher than they really are.\n\nThe order is simple: first enter each product’s cost price or upload it as a list (lesson 8), then set up operating expenses such as the tax rate, monthly taxes and staff salaries (lesson 7). After that, every report shows real numbers.",
      },
      {
        q: "What’s the difference between ABC and XYZ analysis?",
        a: "Both group your products, but they answer different questions. ABC asks “how much does this product contribute to the business?”: group A drives the bulk of your results, B is average, and C has a small share (lesson 4). XYZ asks “how stable is demand for this product?”: X sells steadily, Y fluctuates, and Z is unstable and hard to forecast (lesson 5).\n\nCombine the two and you get 9 groups, from AX to CZ, which makes it easy to take a clear decision for each one: for example, an AX product should always be kept in stock, while you shouldn’t tie up extra money in CZ (lesson 6).",
      },
      {
        q: "Which expenses can I track?",
        a: "Robohub shows all the main sales-related expenses in one place: operating expenses, marketplace commissions, logistics, advertising, storage, penalties and other costs.\n\nYou also see each expense’s share of total spending — so you immediately know where most of your money goes and can start cutting costs exactly there (lesson 2).",
      },
      {
        q: "Can I compare sales across marketplaces?",
        a: "Yes. Alongside total sales, the Dashboard shows each marketplace’s results separately, so you can compare them side by side.\n\nPick a period and see on which marketplace sales are growing and where they’re declining — this helps you decide where to direct more advertising and stock (lesson 1).",
      },
      {
        q: "How do I know which product brings in the most profit?",
        a: "There are two tools for this. The TOP products section shows the SKUs that sell the most and bring in the most orders, as well as the slow movers (lesson 3).\n\nABC analysis shows each product’s contribution to your overall results — together with GMV, margin and expenses (lesson 4). To see accurate profit, cost price must be entered (lesson 8).",
      },
    ],
  },
  order: {
    name: "Orders",
    short: "Uzum, Wildberries and Yandex orders, FBO",
    hero: {
      title: "Orders from every marketplace",
      highlight: "in one account",
      subtitle:
        "View, check and process orders from Uzum Market, Wildberries and Yandex Market in one place.",
      bullets: [
        "Opening and checking new orders",
        "Tracking statuses",
        "Creating FBO supplies",
      ],
    },
    problem: {
      title: "Every marketplace has its own seller account",
      text: "When you sell on several marketplaces, handling orders gets harder and harder: you have to log in to each one and check each one separately.",
    },
    solution: {
      title: "Order → processing → control",
      text: "Robohub brings orders from all your marketplaces into one account. Fewer accounts — less manual work — more control.",
    },
    flow: [
      "A new order comes in from the marketplace",
      "You open and check the order in Robohub",
      "You process it and track its status",
    ],
    features: [
      {
        title: "Uzum Market",
        text: "View and process Uzum orders.",
      },
      {
        title: "Wildberries",
        text: "Manage WB orders from your Robohub account.",
      },
      {
        title: "Yandex Market",
        text: "Open Yandex orders and track their statuses.",
      },
      {
        title: "FBO supplies",
        text: "Create supplies to ship to the marketplace warehouse.",
      },
    ],
    steps: [
      {
        title: "Open the Orders section",
        text: "Orders from all your marketplaces are here.",
      },
      {
        title: "Open a new order",
        text: "Check the order details.",
      },
      { title: "Process it", text: "Manage the order status." },
      {
        title: "Track the status",
        text: "Keep an eye on which stage the order is at.",
      },
    ],
    faqs: [
      {
        q: "Which marketplaces’ orders can I work with?",
        a: "The lessons cover processing orders from Uzum Market, Wildberries and Yandex Market — with a separate lesson for each (lessons 10–12).\n\nOrders from all marketplaces arrive in a single Robohub account, so there’s no need to log in to each marketplace’s seller account separately. To make this work, your marketplace account must be connected first (see the Integration topic).",
      },
      {
        q: "What are the stages of processing an order?",
        a: "The process has four steps: 1) open the order list; 2) open a new order and check its contents; 3) process the order; 4) then keep tracking its status.\n\nThe flow is the same for Uzum Market, Wildberries and Yandex Market — the only difference is each marketplace’s own stage names. Every marketplace lesson walks through these steps on screen (lessons 10–12).",
      },
      {
        q: "Where do I manage the order status?",
        a: "In the Orders section. Open the order you need, check its details and change its status.\n\nKeeping statuses up to date matters: that way you always know exactly which stage each order is at, and delays and cancellations go down. The process is shown using Uzum Market as an example in lesson 14.",
      },
      {
        q: "Why do I need FBO supplies?",
        a: "Under the FBO model, your goods are stored in the marketplace’s warehouse and the marketplace delivers orders itself. A supply is the request that formalizes how much of which product is being sent to the marketplace warehouse.\n\nIn Robohub you create a new supply, choose the products and quantities, check the details and manage your ready supplies. A properly prepared supply ensures your goods reach the warehouse on time and your sales don’t stall (lesson 13).",
      },
      {
        q: "How do I notice that orders are dropping?",
        a: "In the Order trends section. It shows how the number of orders changed over the selected period and which marketplaces the orders are coming from.\n\nGrowth and declines are visible on the chart right away. If you catch a drop early, you have time to find the cause — price, stock or competition — and act on it (lesson 9).",
      },
    ],
  },
  product: {
    name: "Products",
    short: "Product cards and price updates",
    hero: {
      title: "Product cards and prices —",
      highlight: "from one place",
      subtitle:
        "Create product cards and update prices — Robohub sends the changes to the marketplace for you.",
      bullets: [
        "Creating a new product card",
        "Changing a price and sending it to the marketplace",
        "Managing products from one account",
      ],
    },
    problem: {
      title: "A separate login for every change",
      text: "To update a price or add a new product, you have to log in to each marketplace’s seller account separately.",
    },
    solution: {
      title: "Product → change → marketplace",
      text: "In Robohub you create a product card or change a price and send it to the marketplace.",
    },
    flow: [
      "You select a product in the Products section",
      "You change its details or price",
      "Robohub sends it to the marketplace",
    ],
    features: [
      {
        title: "Product card",
        text: "Fill in the details, price and other fields, then save and send.",
      },
      {
        title: "Price updates",
        text: "Enter a new price and send it to the marketplace.",
      },
    ],
    steps: [
      {
        title: "Go to the Products section",
        text: "A list of all your products.",
      },
      {
        title: "Create a card or select a product",
        text: "Open a new product or an existing one.",
      },
      {
        title: "Enter details and price",
        text: "Fill in the required fields.",
      },
      {
        title: "Save and send",
        text: "The change is sent to the marketplace.",
      },
    ],
    faqs: [
      {
        q: "How does a price change reach the marketplace?",
        a: "You don’t need to change the price in each marketplace’s seller account separately. In Robohub’s Products section, open the product you need, enter the new price and send it straight to the marketplace.\n\nThis way you can respond quickly to promotions, seasonality or competitors, and avoid the mistakes that come with manual changes across several accounts (lesson 15).",
      },
      {
        q: "Can I create a product card in Robohub?",
        a: "Yes. A new product card is created and filled in within Robohub and sent to the marketplace from there — no need to log in to the marketplace’s seller account separately (lesson 16).",
      },
      {
        q: "What information goes into a product card?",
        a: "Product details, price and the card’s other fields. Once everything is filled in, the card is saved and sent to the marketplace.\n\nThe more complete and accurate the card, the better the product shows up in search and the faster it wins over buyers. The whole process is shown step by step in lesson 16.",
      },
      {
        q: "What should I check before changing a price?",
        a: "That the product’s cost price and your operating expenses have been entered in Robohub. Without them, you can’t tell how much margin you’ll keep at the new price — and the price could end up selling at a loss.\n\nEntering cost price and expenses is covered in lessons 7 and 8 of the Analytics topic.",
      },
    ],
  },
  warehouse: {
    name: "Warehouse",
    short: "Warehouse grouping and Missing",
    hero: {
      title: "Keep your warehouses",
      highlight: "well organized",
      subtitle:
        "Group your warehouses and keep track of products in Missing status from one account.",
      bullets: [
        "Grouping warehouses",
        "Managing warehouse groups",
        "Viewing products in Missing status",
      ],
    },
    problem: {
      title: "Lots of warehouses, no order",
      text: "Products sit in different warehouses, and going through them one by one takes time. It gets hard to know which product is where and what state it’s in.",
    },
    solution: {
      title: "Warehouse → grouping → management",
      text: "In Robohub you sort warehouses into groups and work with them from one account. The Missing section shows products with issues separately.",
    },
    flow: [
      "You see your existing warehouses",
      "You sort them into groups",
      "You manage the groups and Missing products",
    ],
    features: [
      {
        title: "Warehouse grouping",
        text: "Sort your existing warehouses into groups that suit you.",
      },
      {
        title: "Group management",
        text: "Work with grouped warehouses in one place.",
      },
      {
        title: "Missing",
        text: "View products in Missing status and check their details.",
      },
      {
        title: "FBO supplies",
        text: "Plan shipments of products to the marketplace warehouse.",
      },
    ],
    steps: [
      { title: "Go to the “Warehouse” section", text: "Warehouse, in the left menu." },
      { title: "View your warehouses", text: "A list of existing warehouses." },
      {
        title: "Sort them into groups",
        text: "Add warehouses to the groups you need.",
      },
      {
        title: "Manage the groups",
        text: "Work with your grouped warehouses.",
      },
    ],
    faqs: [
      {
        q: "Why should I group warehouses?",
        a: "As your marketplaces and own warehouses multiply, tracking stock warehouse by warehouse gets harder. Grouping lets you combine several warehouses into a group that suits you — for example, all the warehouses in one city.\n\nAs a result, it’s easier to see your overall stock and work with it in an organized way from one account (lesson 18).",
      },
      {
        q: "Where can I see products in Missing status?",
        a: "In the dedicated Missing section within the “Warehouse” section. It lists products in Missing status, and you can open each one to check its details.\n\nReview this section regularly: the earlier you spot a problem product, the easier it is to resolve (lesson 19).",
      },
      {
        q: "What’s the difference between lessons 17 and 18?",
        a: "Both are about grouping warehouses. Lesson 17 is a quick overview: going to the Warehouses section, viewing existing warehouses and sorting them into groups.\n\nLesson 18 covers the full process: in addition to the above, it shows how to manage warehouse groups and work with grouped warehouses. Watch lesson 17 for a quick introduction and lesson 18 for an in-depth look.",
      },
      {
        q: "How do I ship goods to a marketplace warehouse?",
        a: "Through an FBO supply. In Robohub you create a new supply, choose how much of which product to send, check the details and prepare the supply.\n\nThis process is covered in detail in lesson 13 of the Orders topic.",
      },
    ],
  },
  marketing: {
    name: "Marketing",
    short: "Promo codes, promotions calendar, Boost TOP",
    hero: {
      title: "Promo codes, promotions and Boost TOP —",
      highlight: "in one account",
      subtitle:
        "Track and manage marketplace marketing tools without switching between seller accounts.",
      bullets: [
        "Managing promo codes",
        "Promotions calendar and terms",
        "Working with Boost TOP",
      ],
    },
    problem: {
      title: "Promotions are impossible to keep track of",
      text: "When each promotion starts, what its terms are, and which promo codes are active — you have to track all of it separately on every marketplace.",
    },
    solution: {
      title: "Marketing → Promo codes → Calendar",
      text: "Robohub’s Marketing section brings promo codes, the promotions calendar and Boost TOP together in one place.",
    },
    flow: [
      "You open the Marketing section",
      "You view the promotions calendar and promo codes",
      "You manage products through Boost TOP",
    ],
    features: [
      {
        title: "Promo codes",
        text: "View and manage promo codes.",
      },
      {
        title: "Promotions calendar",
        text: "Promotion dates and terms in one place.",
      },
      {
        title: "Boost TOP",
        text: "View Boost TOP data and manage products.",
      },
    ],
    steps: [
      {
        title: "Go to the “Marketing” section",
        text: "Marketing, in the left menu.",
      },
      { title: "View the calendar", text: "Promotion dates and terms." },
      {
        title: "Manage promo codes",
        text: "A list of existing promo codes.",
      },
      {
        title: "Open Boost TOP",
        text: "Manage products through Boost TOP.",
      },
    ],
    faqs: [
      {
        q: "Can I manage promo codes from Robohub?",
        a: "Yes. In the “Marketing” section you can view and manage your marketplace promo codes — no need to log in to each marketplace’s seller account separately (lesson 20).",
      },
      {
        q: "What does the promotions calendar show?",
        a: "The dates and terms of marketplace promotions — all in one calendar.\n\nWhen you know in advance when each promotion starts and ends, you have time to prepare for it — restock and adjust your prices (lesson 20).",
      },
      {
        q: "What can I do in Boost TOP?",
        a: "Boost TOP helps push products higher in marketplace search. In Robohub’s “Marketing” section, open Boost TOP to view its data and manage products through this feature.\n\nTrack the results to find out which products are most worth boosting (lesson 21).",
      },
      {
        q: "How should I prepare for a promotion?",
        a: "First, review the dates and terms in the promotions calendar (lesson 20). Then update the prices of the products taking part in the promotion from the Products section (lesson 15).\n\nBefore changing prices, check that cost price and expenses have been entered — that way you’ll know you stay profitable even with the discount (Analytics: lessons 7–8).",
      },
    ],
  },
  integration: {
    name: "Integration",
    short: "Connecting Uzum, Wildberries, Yandex and Ozon",
    hero: {
      title: "Connect your marketplace accounts",
      highlight: "in just a few minutes",
      subtitle:
        "Connect your Uzum Market, Wildberries, Yandex Market and Ozon accounts to Robohub and manage them from one place.",
      bullets: [
        "Entering integration details",
        "Checking the connection",
        "Activating the integration",
      ],
    },
    problem: {
      title: "The first step to getting started",
      text: "For Robohub to work, your marketplace accounts need to be connected — without that, no data comes in.",
    },
    solution: {
      title: "Integration → marketplace → connect",
      text: "Every marketplace connects the same way: you choose it, enter the details, then check and activate the connection.",
    },
    flow: [
      "You choose a marketplace in the “Integration” section",
      "You enter your account details",
      "You check the connection and activate it",
    ],
    features: [
      { title: "Uzum Market", text: "Connect your Uzum account." },
      { title: "Wildberries", text: "Connect your WB account." },
      { title: "Yandex Market", text: "Connect your Yandex account." },
      { title: "Ozon", text: "Connect your Ozon account." },
    ],
    steps: [
      {
        title: "Go to the “Integration” section",
        text: "Integration, in the left menu.",
      },
      {
        title: "Choose a marketplace",
        text: "Uzum, Wildberries, Yandex or Ozon.",
      },
      {
        title: "Enter the details",
        text: "The information required for the integration.",
      },
      {
        title: "Check and activate",
        text: "Make sure the connection is working.",
      },
    ],
    faqs: [
      {
        q: "Which marketplaces can I connect?",
        a: "Four marketplaces: Uzum Market, Wildberries, Yandex Market and Ozon. The connection process for each is shown in a separate lesson (lessons 22–25).\n\nYou can connect several of them or all of them at once — they work together in a single Robohub account.",
      },
      {
        q: "Where should I start with Robohub?",
        a: "With integration. Until your marketplace account is connected to Robohub, the orders, products and analytics sections will be empty — all the data comes in through this connection.\n\nStart by connecting the marketplace you sell on (for example, Uzum Market — lesson 22), then add the rest.",
      },
      {
        q: "What do I need to do to connect?",
        a: "The process has five steps: 1) go to the “Integration” section; 2) choose the marketplace you need; 3) connect your account; 4) enter the integration details; 5) check the connection and activate it.\n\nEvery marketplace lesson walks through these steps on screen (lessons 22–25).",
      },
      {
        q: "What should I check after connecting?",
        a: "That the connection has been checked and activated. Only after this final step does data start flowing from the marketplace into Robohub.\n\nIf the connection isn’t activated, orders and products won’t appear in your account — which is why every integration lesson ends with exactly this check.",
      },
    ],
  },
  communication: {
    name: "Communication",
    short: "Chat and automatic replies to reviews",
    hero: {
      title: "Customer communication",
      highlight: "in one window",
      subtitle:
        "Manage marketplace conversations and review replies from one account.",
      bullets: [
        "Chat list and conversations",
        "Automatic replies to reviews",
        "Auto-reply settings",
      ],
    },
    problem: {
      title: "Messages and reviews are scattered",
      text: "Customer conversations and reviews are separate on every marketplace — it’s hard to see them in time.",
    },
    solution: {
      title: "Chat → messages → auto-reply",
      text: "In Robohub, conversations live in a single Chat section, and reviews can be answered automatically.",
    },
    flow: [
      "A customer writes or leaves a review",
      "You see it in Robohub’s Chat or Auto-reply section",
      "You reply, or the auto-reply does it for you",
    ],
    features: [
      {
        title: "Chat",
        text: "View and manage conversations with customers.",
      },
      {
        title: "Auto-reply",
        text: "Reply to reviews automatically and configure the replies.",
      },
    ],
    steps: [
      { title: "Open the “Chat” section", text: "Chat list." },
      { title: "View conversations", text: "Customer messages." },
      { title: "Go to “Auto-reply”", text: "Customer reviews." },
      { title: "Review the settings", text: "Automatic reply rules." },
    ],
    faqs: [
      {
        q: "Are chats from different marketplaces shown in one place?",
        a: "Yes. The “Chat” section brings your customer conversations from all marketplaces into one account — no need to open each marketplace separately to look for messages.\n\nThat way, no customer question goes unanswered (lesson 26).",
      },
      {
        q: "What can I do in the Chat section?",
        a: "View the chat list, open a conversation with a specific customer and manage messages.\n\nReplying quickly to customer questions has a direct impact on sales and your store rating — this section speeds that process up (lesson 26).",
      },
      {
        q: "Can I automate replies to reviews?",
        a: "Yes. In the “Auto-reply” section you turn on automatic replies to customer reviews and adjust the settings to suit you.\n\nThat way you don’t spend time writing a reply to every review by hand, and customers never go without an answer (lesson 27).",
      },
      {
        q: "Where can I see customer reviews?",
        a: "In the “Auto-reply” section — it shows a list of customer reviews, and you can also track the replies given to them (lesson 27).",
      },
    ],
  },
  management: {
    name: "Management",
    short: "Documents, staff, roles and infographics",
    hero: {
      title: "Your team and documents —",
      highlight: "under control",
      subtitle:
        "Assign roles and permissions to staff, manage documents, and see sales data as infographics.",
      bullets: [
        "Roles and permissions for staff",
        "Document list and management",
        "Infographics: data in visual form",
      ],
    },
    problem: {
      title: "Everyone on the team sees everything",
      text: "As your team grows, it gets harder to control who can access what and where your documents are.",
    },
    solution: {
      title: "Staff → Roles → Permissions",
      text: "In Robohub, every staff member is given a role, and each role is granted the permissions it needs. Documents are kept in one section too.",
    },
    flow: [
      "You create a role",
      "You assign permissions to the role",
      "Staff work with those permissions",
    ],
    features: [
      {
        title: "Roles",
        text: "Add new roles and assign permissions.",
      },
      {
        title: "Documents",
        text: "A list of documents and tools to manage them.",
      },
      {
        title: "Infographics",
        text: "See marketplace data visually.",
      },
    ],
    steps: [
      { title: "Go to the “Staff” section", text: "Staff, in the left menu." },
      { title: "Open Roles", text: "A list of existing roles." },
      { title: "Add a new role", text: "Give the role a name." },
      {
        title: "Assign permissions",
        text: "Choose what the role can access.",
      },
    ],
    faqs: [
      {
        q: "How do I give staff access?",
        a: "Through roles. In the “Staff” section, open Roles, add a new role, give it a name and define which sections it can access — that is, its permissions.\n\nAfter that, each staff member only sees the sections they’re allowed to: work stays organized and sensitive data stays protected. You can keep managing the roles you’ve created later on (lesson 29).",
      },
      {
        q: "What can I do in the Documents section?",
        a: "View the list of documents, open each document to see its details, and manage your documents (lesson 28).",
      },
      {
        q: "Do I have to look for documents in each marketplace’s seller account?",
        a: "No. Documents related to your marketplace work are gathered in one place — Robohub’s Documents section.\n\nYou don’t have to hunt for a document across several accounts — it’s quick to find and easy to keep under control (lesson 28).",
      },
      {
        q: "Where are infographics, and what do they give me?",
        a: "Infographics are located in the Learning materials section. They present marketplace data and sales metrics visually — as charts and images instead of tables.\n\nThis helps you understand the numbers faster, and trends and changes are visible at a glance (lesson 30).",
      },
    ],
  },
};

export const startPath: AcademyContent["startPath"] = {
  integration: "Connect your marketplace store to Robohub",
  product: "Update product cards and prices from one place",
  order: "Process orders from every marketplace in one window",
  analytics: "See your sales, expenses and profit in numbers",
};
