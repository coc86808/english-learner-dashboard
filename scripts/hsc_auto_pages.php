<?php
/**
 * Plugin Name: HSC Auto Page Generator (MU Plugin)
 * Description: Auto creates core HSC English pages in WordPress
 */

add_action('init', function() {
    if (get_option('hsc_pages_auto_created_v2')) {
        return; // Only run once
    }

    // 1. Delete default "Sample Page"
    $sample_page = get_page_by_path('sample-page');
    if ($sample_page) {
        wp_delete_post($sample_page->ID, true);
    }

    $pages = [
        [
            'title' => 'Home — Learner Hub HSC 2026',
            'slug' => 'home',
            'content' => '
<!-- wp:heading {"level":1} -->
<h1>HSC 2026 English For Today — স্মার্ট ভোকাবুলারি ও MCQ লার্নিং প্ল্যাটফর্ম</h1>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>স্বাগতম <strong>Learner Hub</strong>-এ! এটি উচ্চমাধ্যমিক (HSC 2026) শিক্ষার্থীদের জন্য NCTB পাঠ্যবই <em>"English For Today"</em>-এর প্রতিটি অধ্যায়ের শব্দার্থ, সিনোনিম, অ্যান্টনিম ও বোর্ড স্ট্যান্ডার্ড MCQ অনুশীলনের সম্পূর্ণ সমাধান।</p>
<!-- /wp:paragraph -->

<!-- wp:columns -->
<div class="wp-block-columns">
<div class="wp-block-column">
<h3>📖 Vocabulary Bank</h3>
<p>পাঠ্যবইয়ের প্রতিটি শব্দের সঠিক বাংলা অর্থ, পার্টস অফ স্পিচ, সিনোনিম, অ্যান্টনিম ও বাক্য প্রয়োগ।</p>
</div>
<div class="wp-block-column">
<h3>🗂️ 3D Flashcards</h3>
<p>অ্যাক্টিভ রিকল প্রযুক্তির ফ্লিপ কার্ড এবং আমেরিকান/ব্রিটিশ অডিও উচ্চারণ।</p>
</div>
<div class="wp-block-column">
<h3>🎯 Spaced Repetition MCQ</h3>
<p>ভুল হলে বারবার প্রশ্ন আসবে যতক্ষণ না টানা ৩ বার সঠিক উত্তর দিয়ে কনসেপ্ট আয়ত্ত হচ্ছে।</p>
</div>
</div>
<!-- /wp:columns -->

<!-- wp:buttons -->
<div class="wp-block-buttons">
<div class="wp-block-button"><a class="wp-block-button__link" href="https://englishhsc.infinityfree.me/">▶ ওপেন রিয়্যাক্ট লার্নিং ড্যাশবোর্ড</a></div>
</div>
<!-- /wp:buttons -->
'
        ],
        [
            'title' => 'Vocabulary Bank (ভোকাবুলারি ব্যাংক)',
            'slug' => 'vocabulary-bank',
            'content' => '
<!-- wp:heading {"level":1} -->
<h1>HSC English For Today — সম্পূর্ণ ভোকাবুলারি ব্যাংক</h1>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>এখানে পাঠ্যবইয়ের প্রতিটি লেসনের সব গুরুত্বপূর্ণ শব্দার্থ সংকলন করা হয়েছে। প্রতিটি শব্দের সাথে রয়েছে ৪টি গুরুত্বপূর্ণ অংশ:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li><strong>সঠিক বাংলা অর্থ:</strong> পাঠ্যবইয়ের কনটেক্সট অনুযায়ী পারফেক্ট অর্থ।</li>
<li><strong>সমার্থক শব্দ (Synonyms):</strong> বোর্ড পরীক্ষায় আসা স্ট্যান্ডার্ড সিনোনিম।</li>
<li><strong>বিপরীতার্থক শব্দ (Antonyms):</strong> যথাযথ বিপরীত অর্থবোধক শব্দ।</li>
<li><strong>ইংরেজি সংজ্ঞা ও উদাহরণ:</strong> English 1st Paper Comprehension ও Fill in the blanks-এর জন্য সহায়ক।</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {"level":2} -->
<h2>অন্তর্ভুক্ত অধ্যায়সমূহ:</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>• <strong>Unit 1 Lesson 1: The Parrot\'s Tale (তোতাকাহিনী)</strong> — ৪৬টি শব্দ ও ১৮০টি MCQ<br>
• <strong>Unit 10 Lesson 1: Manners Around the World</strong> — ৭৪টি শব্দ ও ২৯০টি MCQ<br>
• <strong>Unit 10 Lesson 2: Etiquette Netiquette</strong> — ৩৬টি শব্দ ও ১৪৩টি MCQ</p>
<!-- /wp:paragraph -->
'
        ],
        [
            'title' => 'Exams & Practice (ইউনিট ও লেসন পরীক্ষা)',
            'slug' => 'exams-and-practice',
            'content' => '
<!-- wp:heading {"level":1} -->
<h1>বোর্ড স্ট্যান্ডার্ড MCQ পরীক্ষা ও স্পেসড রিপিটিশন</h1>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>সাধারণ পরীক্ষার মতো এখানে শুধু নাম্বার দিয়ে ছেড়ে দেওয়া হয় না। আমাদের স্পেসড রিপিটিশন অ্যালগরিদম প্রতিটি ভুল উত্তরকে আবার সামনে নিয়ে আসে যতক্ষণ না শিক্ষার্থী টানা ৩ বার সঠিক উত্তর দেয়।</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>৪ ধরণের প্রশ্ন ক্যাটাগরি:</h2>
<!-- /wp:heading -->

<!-- wp:list -->
<ul>
<li>🔄 <strong>Synonym MCQs</strong> (বোর্ড পরীক্ষায় সিনোনিম সনাক্তকরণ)</li>
<li>🔀 <strong>Antonym MCQs</strong> (বোর্ড পরীক্ষায় অ্যান্টনিম সনাক্তকরণ)</li>
<li>📖 <strong>English Meaning MCQs</strong> (কনটেক্সচুয়াল ডেফিনিশন)</li>
<li>🇧🇩 <strong>Bangla Meaning MCQs</strong> (বাংলা শব্দার্থ টেস্ট)</li>
</ul>
<!-- /wp:list -->
'
        ],
        [
            'title' => '3D Flashcards (ফ্ল্যাশকার্ড মেমোরি সিস্টেম)',
            'slug' => 'flashcards',
            'content' => '
<!-- wp:heading {"level":1} -->
<h1>অ্যাক্টিভ রিকল ও ৩ডি ফ্ল্যাশকার্ড</h1>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>বৈজ্ঞানিকভাবে প্রমাণিত যে শুধু মুখস্থ করার চেয়ে <em>Active Recall</em> পদ্ধতিতে ফ্ল্যাশকার্ড ফ্লিপ করে শব্দ মনে রাখা ৩ গুণ বেশি স্থায়ী হয়।</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li><strong>কার্ডের সামনের দিক:</strong> মূল ইংরেজি শব্দ।</li>
<li><strong>কার্ডের পেছনের দিক:</strong> বাংলা অর্থ, পার্টস অফ স্পিচ, সিনোনিম, অ্যান্টনিম ও ইংরেজি সংজ্ঞা।</li>
<li><strong>অডিও উচ্চারণ:</strong> টেক্সট-টু-স্পিচ বাটনে ক্লিক করে সঠিক উচ্চারণ শোনা যাবে।</li>
<li><strong>Weak Words স্টার মার্ক:</strong> কঠিন শব্দগুলোকে স্টার (⭐) দিয়ে আলাদা করে রিভিশন দেওয়া যায়।</li>
</ul>
<!-- /wp:list -->
'
        ],
        [
            'title' => 'Weak Words & PDF Revision (দুর্বল শব্দ ও পিডিএফ নোট)',
            'slug' => 'weak-words-pdf',
            'content' => '
<!-- wp:heading {"level":1} -->
<h1>দুর্বল শব্দ ট্র্যাকিং ও অফলাইন পিডিএফ শিট</h1>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>যেসব শব্দে পরীক্ষায় ভুল হয়, সিস্টেম স্বয়ংক্রিয়ভাবে সেগুলোকে <strong>Weak Words</strong> লিস্টে জমা রাখে।</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>শিক্ষার্থীরা এক ক্লিকেই তাদের সম্পূর্ণ দুর্বল শব্দের তালিকা দিয়ে <strong>প্রিন্টযোগ্য রিভিশন শিট (PDF)</strong> ডাউনলোড করতে পারে, যা পরীক্ষার আগের রাতে রিভিশনের জন্য দারুণ কার্যকর।</p>
<!-- /wp:paragraph -->
'
        ],
        [
            'title' => 'HSC 2026 English Syllabus (সিলেবাস ও মানবণ্টন)',
            'slug' => 'syllabus',
            'content' => '
<!-- wp:heading {"level":1} -->
<h1>HSC 2026 English 1st Paper সিলেবাস ও মানবণ্টন</h1>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>উচ্চমাধ্যমিক পরীক্ষায় ভালো ফলাফলের জন্য মানবণ্টন ও সিলেবাস স্পষ্ট জানা আবশ্যক:</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><thead><tr><th>আইটেম</th><th>বিবরণ</th><th>নম্বর</th></tr></thead><tbody><tr><td>Part A: Reading</td><td>MCQ (Vocabulary & Meaning based)</td><td>০৫</td></tr><tr><td>Part A: Reading</td><td>Short Answer Questions</td><td>১৫</td></tr><tr><td>Part A: Reading</td><td>Information Transfer / Flow Chart</td><td>০৫</td></tr><tr><td>Part A: Reading</td><td>Summary Writing</td><td>১০</td></tr><tr><td>Part A: Reading</td><td>Cloze Test with Clues</td><td>০৫</td></tr><tr><td>Part A: Reading</td><td>Cloze Test without Clues</td><td>১০</td></tr><tr><td>Part A: Reading</td><td>Rearranging Sentences</td><td>১০</td></tr><tr><td>Part B: Writing</td><td>Paragraph, Story & Letters</td><td>৪০</td></tr></tbody></table></figure>
<!-- /wp:table -->
'
        ]
    ];

    foreach ($pages as $p) {
        $existing = get_page_by_path($p['slug']);
        if (!$existing) {
            wp_insert_post([
                'post_title'    => $p['title'],
                'post_name'     => $p['slug'],
                'post_content'  => $p['content'],
                'post_status'   => 'publish',
                'post_type'     => 'page',
                'post_author'   => 1
            ]);
        }
    }

    update_option('hsc_pages_auto_created_v2', 1);
});
