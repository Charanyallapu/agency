// Array of dish objects containing the visual menu data
const MENU_DATA = [
    {
        id: "s1",
        category: "Starters",
        name: "Chicken Lollipop",
        price: "$14",
        description: "Crispy frenched chicken winglets tossed in a fiery schezwan glaze, finished with fresh scallions and toasted sesame. A crowd-favourite starter that balances heat with crunch in every bite.",
        ingredients: ["Chicken winglets", "Schezwan sauce", "Soy sauce", "Garlic", "Ginger", "Corn flour", "Spring onions", "Sesame seeds"],
        prepNote: "Marinated for 4 hours, double-fried for extra crunch, and flash-tossed in our signature wok sauce.",
        tags: ["Chef's Pick", "Spicy"],
        image: "assets/images/chicken-lollipop.jpg"
    },
    {
        id: "m1",
        category: "Mains",
        name: "Chitti Mutyala Biriyani",
        price: "$22",
        description: "A heritage recipe featuring short-grain 'pearl' rice layered with succulent chicken pieces, caramelized onions, and a fragrant blend of whole spices. Each grain is distinct, each bite aromatic.",
        ingredients: ["Seeraga samba rice", "Chicken", "Yogurt", "Saffron", "Mint", "Cilantro", "Fried onions", "Whole spices", "Ghee"],
        prepNote: "Slow-cooked in a sealed clay pot using the traditional dum method for 45 minutes.",
        tags: ["Signature", "Aromatic"],
        image: "assets/images/chitti-mutyala-biriyani.png"
    },
    {
        id: "m2",
        category: "Mains",
        name: "Mutton Biriyani",
        price: "$24",
        description: "Tender bone-in mutton pieces slow-cooked with aged basmati rice, saffron strands, and our grandmother's secret masala. Topped with crispy fried onions and served with raita.",
        ingredients: ["Goat meat", "Basmati rice", "Saffron", "Cardamom", "Cinnamon", "Bay leaves", "Fried onions", "Rose water", "Ghee"],
        prepNote: "The mutton is pressure-cooked first, then layered with par-boiled rice and finished on dum for deep flavour.",
        tags: ["Signature", "Slow-Cooked"],
        image: "assets/images/mutton-biriyani.png"
    },
    {
        id: "dr1",
        category: "Drinks",
        name: "Rose Milk",
        price: "$6",
        description: "A classic South Indian refresher — chilled whole milk infused with house-made rose syrup, served over crushed ice with a delicate blush-pink hue.",
        ingredients: ["Whole milk", "Rose syrup", "Sugar", "Crushed ice", "Rose petals"],
        prepNote: "Made with our in-house rose extract, no artificial colours. Served ice-cold.",
        tags: ["Refreshing", "Vegetarian"],
        image: "assets/images/rose-milk.png"
    },
    {
        id: "dr2",
        category: "Drinks",
        name: "Badam Milk",
        price: "$7",
        description: "Rich, creamy almond milk simmered with saffron, cardamom, and a touch of sugar. Topped with slivered almonds and delicate saffron strands — comfort in a glass.",
        ingredients: ["Almonds", "Whole milk", "Saffron", "Cardamom", "Sugar", "Cashews", "Pistachios"],
        prepNote: "Almonds are soaked overnight, blanched, and ground fresh every morning.",
        tags: ["Comforting", "Nutty"],
        image: "assets/images/badam-milk.jpg"
    },
    {
        id: "ds1",
        category: "Desserts",
        name: "Strawberry Ice Cream",
        price: "$8",
        description: "Luxuriously smooth, hand-churned strawberry ice cream made with real seasonal berries. Creamy, fruity, and refreshing — the perfect sweet ending.",
        ingredients: ["Fresh strawberries", "Heavy cream", "Whole milk", "Sugar", "Vanilla extract", "Lemon juice"],
        prepNote: "Small-batch churned daily with berries sourced from local farms.",
        tags: ["Fresh", "Vegetarian"],
        image: "assets/images/strawberry-ice-cream.jpg"
    }
];
