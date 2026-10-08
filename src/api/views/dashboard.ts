export function getDashboardHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Posts System | DDD & Event-Driven Architecture</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            mono: ['"JetBrains Mono"', 'monospace'],
          },
          colors: {
            brand: {
              50: '#f5f3ff',
              500: '#8b5cf6',
              600: '#7c3aed',
              700: '#6d28d9',
            }
          }
        }
      }
    }
  </script>
  <style>
    body { background-color: #0b0f19; }
    .glass-card {
      background: rgba(17, 24, 39, 0.75);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .glow-purple {
      box-shadow: 0 0 35px -5px rgba(124, 58, 237, 0.25);
    }
  </style>
</head>
<body class="text-slate-200 min-h-screen flex flex-col font-sans antialiased selection:bg-brand-600 selection:text-white">

  <!-- Top Navigation -->
  <header class="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-brand-500/30">
          <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
        </div>
        <div>
          <h1 class="text-base font-bold text-white tracking-tight flex items-center gap-2">
            Posts System <span class="text-xs px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 font-medium">DDD + Kafka</span>
          </h1>
          <p class="text-xs text-slate-400">Event-Driven Microarchitecture Demo</p>
        </div>
      </div>

      <!-- System Status Badges -->
      <div class="flex items-center gap-2 text-xs">
        <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          REST API: Online
        </div>
        <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-medium">
          <span class="w-2 h-2 rounded-full bg-indigo-400"></span>
          Kafka: KRaft
        </div>
        <div class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium">
          <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
          MongoDB: Active
        </div>
      </div>
    </div>
  </header>

  <!-- Main Container -->
  <main class="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">

    <!-- Hero / Architecture Overview -->
    <div class="glass-card rounded-2xl p-6 sm:p-8 glow-purple">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <h2 class="text-2xl font-extrabold text-white tracking-tight">Interactive Event-Driven Dashboard</h2>
          <p class="text-sm text-slate-400 mt-1">
            Built strictly adhering to <strong class="text-slate-200">Domain-Driven Design (DDD)</strong> with decoupled layers, persistence in <strong class="text-slate-200">MongoDB</strong>, and asynchronous event streaming via <strong class="text-slate-200">Apache Kafka</strong>.
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <a href="/posts" target="_blank" class="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5">
            <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
            Raw JSON API (/posts)
          </a>
          <a href="/health" target="_blank" class="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5">
            <svg class="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            /health
          </a>
        </div>
      </div>

      <!-- Pipeline Visualization Flow -->
      <div class="mt-6 pt-2">
        <h3 class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Live Architecture Flow</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
          <div class="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
            <span class="text-brand-400 font-bold mb-1">1. API Layer</span>
            <span class="text-slate-300">Express Controller</span>
            <span class="text-[11px] text-slate-500 mt-2">POST /posts, GET /posts</span>
          </div>
          <div class="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
            <span class="text-indigo-400 font-bold mb-1">2. Application & Domain</span>
            <span class="text-slate-300">CreatePostUseCase</span>
            <span class="text-[11px] text-slate-500 mt-2">Entities, Contracts & Invariants</span>
          </div>
          <div class="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
            <span class="text-emerald-400 font-bold mb-1">3. Infrastructure (DB)</span>
            <span class="text-slate-300">MongoPostRepository</span>
            <span class="text-[11px] text-slate-500 mt-2">Mongoose Persistence</span>
          </div>
          <div class="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
            <span class="text-purple-400 font-bold mb-1">4. Messaging (Kafka)</span>
            <span class="text-slate-300">Topic: posts-events</span>
            <span class="text-[11px] text-slate-500 mt-2">Producer ➔ Broker ➔ Consumer</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Interactive Grid (Form + Live Feed) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">

      <!-- Left Column: Create Post Form -->
      <div class="lg:col-span-5 space-y-4">
        <div class="glass-card rounded-2xl p-6">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-7 h-7 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold text-xs">
              +
            </div>
            <h3 class="text-lg font-bold text-white">Create New Post</h3>
          </div>
          <p class="text-xs text-slate-400 mb-5">
            Submitting this form triggers the full DDD flow: persists the entity to MongoDB and publishes an event to Kafka.
          </p>

          <form id="createPostForm" class="space-y-4">
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1.5">Post Title</label>
              <input 
                type="text" 
                id="postTitle" 
                required 
                placeholder="e.g. Scalable Microservices with Node.js"
                class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition"
              >
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1.5">Post Content</label>
              <textarea 
                id="postContent" 
                rows="4" 
                required 
                placeholder="Write the post content here..."
                class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition"
              ></textarea>
            </div>

            <button 
              type="submit" 
              id="submitBtn"
              class="w-full py-3 px-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 shadow-lg shadow-brand-600/30 active:scale-[0.99] transition flex items-center justify-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
              <span>Publish Post & Emit Kafka Event</span>
            </button>
          </form>

          <!-- Status Toast / Alert -->
          <div id="statusAlert" class="hidden mt-4 p-3.5 rounded-xl text-xs font-mono transition"></div>
        </div>
      </div>

      <!-- Right Column: Live Feed from MongoDB -->
      <div class="lg:col-span-7 space-y-4">
        <div class="glass-card rounded-2xl p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                DB
              </div>
              <div>
                <h3 class="text-lg font-bold text-white">Live Posts Feed</h3>
                <p class="text-xs text-slate-400">Retrieved in real-time from MongoDB (<code class="text-emerald-400 font-mono">GET /posts</code>)</p>
              </div>
            </div>
            <button 
              onclick="loadPosts()" 
              class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition flex items-center gap-1.5"
            >
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              Refresh
            </button>
          </div>

          <!-- Posts Container -->
          <div id="postsList" class="space-y-3 max-h-[520px] overflow-y-auto pr-1">
            <div class="text-center py-12 text-slate-500 text-xs font-mono animate-pulse">
              Loading posts from MongoDB...
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- REST API Endpoints Reference -->
    <div class="glass-card rounded-2xl p-6">
      <h3 class="text-base font-bold text-white mb-3 flex items-center gap-2">
        <svg class="w-5 h-5 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
        REST API Endpoints Specification
      </h3>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs font-mono">
          <thead>
            <tr class="border-b border-slate-800 text-slate-400">
              <th class="py-2.5 px-3">Method</th>
              <th class="py-2.5 px-3">Endpoint</th>
              <th class="py-2.5 px-3">Layer / Description</th>
              <th class="py-2.5 px-3">Kafka Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/60 text-slate-300">
            <tr>
              <td class="py-3 px-3"><span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">GET</span></td>
              <td class="py-3 px-3 font-semibold text-white">/health</td>
              <td class="py-3 px-3 text-slate-400">Service health check</td>
              <td class="py-3 px-3 text-slate-500">—</td>
            </tr>
            <tr>
              <td class="py-3 px-3"><span class="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold">POST</span></td>
              <td class="py-3 px-3 font-semibold text-white">/posts</td>
              <td class="py-3 px-3 text-slate-400">Create new item (Save to Mongo)</td>
              <td class="py-3 px-3 text-purple-400 font-semibold">Emits post.created</td>
            </tr>
            <tr>
              <td class="py-3 px-3"><span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">GET</span></td>
              <td class="py-3 px-3 font-semibold text-white">/posts</td>
              <td class="py-3 px-3 text-slate-400">List all items from MongoDB</td>
              <td class="py-3 px-3 text-slate-500">—</td>
            </tr>
            <tr>
              <td class="py-3 px-3"><span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">GET</span></td>
              <td class="py-3 px-3 font-semibold text-white">/posts/:id</td>
              <td class="py-3 px-3 text-slate-400">Get single item by ID</td>
              <td class="py-3 px-3 text-slate-500">—</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </main>

  <footer class="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
    Clean Architecture Backend System • DDD • Node.js • Express • MongoDB • Apache Kafka • Docker
  </footer>

  <script>
    async function loadPosts() {
      const container = document.getElementById('postsList');
      try {
        const res = await fetch('/posts');
        const json = await res.json();

        if (!json.success || !json.data || json.data.length === 0) {
          container.innerHTML = \`
            <div class="text-center py-10 text-slate-500 text-xs">
              No posts found in database yet. Create your first post on the left!
            </div>
          \`;
          return;
        }

        container.innerHTML = json.data.map(post => \`
          <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 transition space-y-2">
            <div class="flex items-center justify-between">
              <h4 class="text-sm font-bold text-white tracking-tight">\${escapeHtml(post.title)}</h4>
              <span class="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                \${new Date(post.createdAt).toLocaleString()}
              </span>
            </div>
            <p class="text-xs text-slate-300 leading-relaxed">\${escapeHtml(post.content)}</p>
            <div class="pt-1 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>ID: <code class="text-slate-400">\${post.id}</code></span>
              <span class="text-emerald-400 flex items-center gap-1">● Saved in MongoDB</span>
            </div>
          </div>
        \`).join('');
      } catch (err) {
        container.innerHTML = \`
          <div class="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
            Failed to fetch posts: \${err.message}
          </div>
        \`;
      }
    }

    document.getElementById('createPostForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('submitBtn');
      const alertBox = document.getElementById('statusAlert');
      const titleInput = document.getElementById('postTitle');
      const contentInput = document.getElementById('postContent');

      submitBtn.disabled = true;
      submitBtn.classList.add('opacity-75');

      alertBox.className = 'mt-4 p-3.5 rounded-xl text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700 block';
      alertBox.innerHTML = '⚡ Processing DDD flow & publishing Kafka event...';

      try {
        const res = await fetch('/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: titleInput.value.trim(),
            content: contentInput.value.trim(),
          })
        });

        if (!res.ok) {
          const errText = await res.text();
          let msg = 'Server error (' + res.status + ')';
          try {
            const errObj = JSON.parse(errText);
            msg = errObj.error || msg;
          } catch (_) {
            msg = 'Request timed out or tunnel disconnected. Please retry or test via http://localhost:3000';
          }
          throw new Error(msg);
        }

        const data = await res.json();

        if (data.success) {
          alertBox.className = 'mt-4 p-3.5 rounded-xl text-xs font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 block';
          alertBox.innerHTML = \`
            <strong>✓ Success!</strong> Post persisted to MongoDB (ID: \${data.data.id}).<br>
            <span class="text-purple-300">⚡ Kafka Event emitted: [post.created]</span>
          \`;
          titleInput.value = '';
          contentInput.value = '';
          loadPosts();
        } else {
          throw new Error(data.error || 'Failed to create post');
        }
      } catch (err) {
        alertBox.className = 'mt-4 p-3.5 rounded-xl text-xs font-mono bg-red-500/10 border border-red-500/30 text-red-300 block';
        alertBox.innerHTML = \`✕ Error: \${err.message}\`;
      } finally {
        submitBtn.disabled = false;
        submitBtn.classList.remove('opacity-75');
      }
    });

    function escapeHtml(str) {
      if (!str) return '';
      return str.replace(/[&<>"']/g, function(m) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
      });
    }

    // Load initial posts on page load
    loadPosts();
  </script>
</body>
</html>`;
}
