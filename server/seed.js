const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'data.json');

const names = [
    "Aarav Sharma", "Priya Patel", "Rohan Gupta", "Ananya Singh",
    "Vikram Malhotra", "Neha Desai", "Arjun Reddy", "Kavya Iyer",
    "Rahul Verma", "Sneha Joshi", "Aditya Nair", "Shruti Rao",
    "Kabir Kapoor", "Pooja Menon", "Siddharth Das", "Ishita Bose"
];

const tags = ["General", "Branch Notes", "Internship Prep", "Exams", "Campus Life"];

const samplePosts = [
    {
        title: "Morgan Stanley IT Interview Experience (Selected)",
        content: "Hey everyone! Just wanted to share my experience interviewing for the Summer Analyst role at Morgan Stanley. The process consisted of 1 coding round and 3 technical interviews. Focus heavily on OOPs concepts and Data Structures (especially DP and graphs). I've attached my preparation notes below. Let me know if anyone has questions!",
        tag: "Internship Prep"
    },
    {
        title: "DBMS Notes for Endsems - B.Tech CS",
        content: "I've compiled all the crucial topics for our upcoming DBMS endsems, including SQL queries, Normalization (1NF to BCNF), and transaction concurrency control. Attached the Google Drive link. Hope it helps!",
        tag: "Branch Notes",
        linkUrl: "drive.google.com/dbms-notes-vjti"
    },
    {
        title: "Is the library open on weekends during exams?",
        content: "Does anyone know the exact timings for the main library this weekend? The circular was a bit confusing and I really need a quiet place to study.",
        tag: "Campus Life"
    },
    {
        title: "Data Structures practicals submission",
        content: "Reminder for the SY students: the final DSA practical journal submission is pre-poned to this Friday. Please ensure all 12 experiments are signed by the prof.",
        tag: "Exams"
    },
    {
        title: "Tips for tackling the aptitude test for placements",
        content: "Aptitude tests are often the biggest hurdle in the initial shortlisting phase. I highly recommend practicing on IndiaBix and timing yourself. Speed and accuracy matter more than attempting every single question.",
        tag: "Internship Prep"
    },
    {
        title: "Technovanza core committee selections",
        content: "The interviews for the core committee of Technovanza are starting next week! If you are interested in event management or tech operations, make sure you fill out the forms circulated on the WhatsApp groups.",
        tag: "Campus Life"
    }
];

const sampleComments = [
    "This is super helpful, thanks!",
    "Can you share the link again? It's not working for me.",
    "Congratulations! 🎉",
    "I'll be there, thanks for the heads up.",
    "Do they focus more on System Design or purely DSA?",
    "Appreciate the notes, lifesaver!",
    "Does anyone have previous year question papers for this?",
    "Thanks for the tip!"
];

const generateId = () => Math.random().toString(36).substr(2, 9) + Date.now().toString(36);

const generateData = () => {
    let db = { users: [], posts: [] };
    
    if (fs.existsSync(DB_FILE)) {
        try {
            db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
        } catch (e) {
            console.error("Error reading existing DB", e);
        }
    }

    // Generate dummy posts
    samplePosts.forEach((p, index) => {
        const authorName = names[Math.floor(Math.random() * names.length)];
        
        // Generate 2-4 comments per post
        const numComments = Math.floor(Math.random() * 3) + 2;
        const comments = [];
        for (let i = 0; i < numComments; i++) {
            comments.push({
                author: names[Math.floor(Math.random() * names.length)],
                content: sampleComments[Math.floor(Math.random() * sampleComments.length)],
                createdAt: new Date(Date.now() - Math.random() * 100000000).toISOString()
            });
        }

        // Generate upvotes
        const numUpvotes = Math.floor(Math.random() * 15) + 3;
        const upvotes = [];
        for (let i = 0; i < numUpvotes; i++) {
            upvotes.push(generateId()); // Dummy user IDs
        }

        db.posts.push({
            _id: generateId(),
            title: p.title,
            content: p.content,
            tag: p.tag,
            linkUrl: p.linkUrl || "",
            author: authorName,
            upvotes: upvotes,
            comments: comments,
            createdAt: new Date(Date.now() - (index * 86400000) - Math.random() * 10000000).toISOString()
        });
    });

    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
    console.log("Successfully seeded data.json with dummy posts and comments!");
};

generateData();
