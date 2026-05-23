/* ==========================================
   Hogwarts Audiobook Library: Logic & Player
   ========================================== */

// Register PWA Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Service Worker registered successfully', reg.scope))
      .catch(err => console.log('Service Worker registration failed', err));
  });
}

// Global Application State
const state = {
  books: {
    1: { name: "1. Philosopher's Stone", chapters: [], cover: null, coverUrl: null },
    2: { name: "2. The Chamber of Secrets", chapters: [], cover: null, coverUrl: null },
    3: { name: "3. The Prisoner of Azkaban", chapters: [], cover: null, coverUrl: null },
    4: { name: "4. Goblet of Fire", chapters: [], cover: null, coverUrl: null },
    5: { name: "5. Order of the Phoenix", chapters: [], cover: null, coverUrl: null },
    6: { name: "6. Half-Blood Prince", chapters: [], cover: null, coverUrl: null },
    7: { name: "7. Deathly Hallows", chapters: [], cover: null, coverUrl: null }
  },
  pdfFile: null,
  pdfDoc: null,
  activeBookId: null,
  activeChapterIndex: null, // index within the active book's chapter array
  isPlaying: false,
  audioContext: null,
  analyser: null,
  isAudioInitialized: false,
  
  // Subtitles / Read Along State
  currentChapterText: '',
  paragraphs: [], // Array of { text: string, estimatedStart: number, estimatedEnd: number }
  syncOffset: 0, // Manual timing offset in seconds
  subtitleActiveIndex: -1,
  pdfChapterPagesCache: {}, // Cache of chapter title -> page number mapping
  
  // Book page estimates in the combined PDF
  bookPageRanges: {
    1: { start: 1, end: 350 },
    2: { start: 300, end: 700 },
    3: { start: 650, end: 1150 },
    4: { start: 1100, end: 1950 },
    5: { start: 1850, end: 2850 },
    6: { start: 2750, end: 3550 },
    7: { start: 3450, end: 4300 }
  }
};

// UI Elements
const welcomeScreen = document.getElementById('welcomeScreen');
const playerDashboard = document.getElementById('playerDashboard');
const loadFolderBtn = document.getElementById('loadFolderBtn');
const welcomeLoadBtn = document.getElementById('welcomeLoadBtn');
const folderInput = document.getElementById('folderInput');
const bookTabsContainer = document.getElementById('bookTabsContainer');

const audioPlayer = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentTimeLabel = document.getElementById('currentTime');
const durationLabel = document.getElementById('duration');
const progressWrapper = document.getElementById('progressWrapper');
const progressFill = document.getElementById('progressFill');
const progressHandle = document.getElementById('progressHandle');

const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');
const volumeSlider = document.getElementById('volumeSlider');
const muteBtn = document.getElementById('muteBtn');

const activeBookTag = document.getElementById('activeBookTag');
const activeChapterTag = document.getElementById('activeChapterTag');
const nowPlayingTitle = document.getElementById('nowPlayingTitle');
const nowPlayingSubtitle = document.getElementById('nowPlayingSubtitle');
const nowPlayingCover = document.getElementById('nowPlayingCover');
const coverArtContainer = document.getElementById('coverArtContainer');

const chaptersListHeaderTitle = document.getElementById('chaptersListHeaderTitle');
const chaptersList = document.getElementById('chaptersList');

// Subtitle tab elements
const readAlongTabBtn = document.getElementById('readAlongTabBtn');
const subtitlesContainer = document.getElementById('subtitlesContainer');
const subtitlesViewport = document.getElementById('subtitlesViewport');
const pdfLoadingIndicator = document.getElementById('pdfLoadingIndicator');
const offsetSlider = document.getElementById('offsetSlider');
const offsetValue = document.getElementById('offsetValue');
const manualPageInput = document.getElementById('manualPageInput');
const loadPageBtn = document.getElementById('loadPageBtn');
const pdfSearchInput = document.getElementById('pdfSearchInput');

// Drawer elements
const floatingDrawerBtn = document.getElementById('floatingDrawerBtn');
const drawerOverlay = document.getElementById('drawerOverlay');
const closeDrawerBtn = document.getElementById('closeDrawerBtn');
const drawerBookSelect = document.getElementById('drawerBookSelect');
const drawerChaptersList = document.getElementById('drawerChaptersList');

// Visualizer canvas
const visualizerCanvas = document.getElementById('visualizerCanvas');
const largeVisualizerCanvas = document.getElementById('largeVisualizerCanvas');
const visualizerThemeSelect = document.getElementById('visualizerThemeSelect');
const particleCountSlider = document.getElementById('particleCountSlider');

// Double click seek overlays
const seekLeftIndicator = document.getElementById('seekLeftIndicator');
const seekRightIndicator = document.getElementById('seekRightIndicator');

// Set PDF.js Global Worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

// ==========================================
// File Scanner and Parser Logic
// ==========================================

// Trigger input click
[loadFolderBtn, welcomeLoadBtn].forEach(btn => {
  btn.addEventListener('click', () => folderInput.click());
});

folderInput.addEventListener('change', handleFolderSelection);

async function handleFolderSelection(e) {
  const files = Array.from(e.target.files);
  if (files.length === 0) return;

  // Show loading indicator or simple status in console
  console.log(`Scanning ${files.length} files...`);

  // Clear existing chapters
  for (let key in state.books) {
    state.books[key].chapters = [];
    if (state.books[key].coverUrl) {
      URL.revokeObjectURL(state.books[key].coverUrl);
      state.books[key].coverUrl = null;
    }
    state.books[key].cover = null;
  }
  state.pdfFile = null;
  state.pdfDoc = null;
  state.pdfChapterPagesCache = {};

  // Group files
  files.forEach(file => {
    const path = file.webkitRelativePath.toLowerCase();
    
    // Check for PDF
    if (file.name.toLowerCase().endsWith('.pdf')) {
      state.pdfFile = file;
      console.log('PDF detected:', file.name);
      return;
    }

    // Determine which book the file belongs to based on relative directory paths
    let bookId = null;
    if (path.includes('philosopher') || path.includes('sorcerer') || path.includes('book 1') || path.includes('book1') || path.match(/[\\/]1\.\s+/)) {
      bookId = 1;
    } else if (path.includes('chamber') || path.includes('book 2') || path.includes('book2') || path.match(/[\\/]2\.\s+/)) {
      bookId = 2;
    } else if (path.includes('prisoner') || path.includes('azkaban') || path.includes('book 3') || path.includes('book3') || path.match(/[\\/]3\.\s+/)) {
      bookId = 3;
    } else if (path.includes('goblet') || path.includes('fire') || path.includes('book 4') || path.includes('book4') || path.match(/[\\/]4\.\s+/)) {
      bookId = 4;
    } else if (path.includes('phoenix') || path.includes('book 5') || path.includes('book5') || path.match(/[\\/]5\.\s+/)) {
      bookId = 5;
    } else if (path.includes('half') || path.includes('prince') || path.includes('book 6') || path.includes('book6') || path.match(/[\\/]6\.\s+/)) {
      bookId = 6;
    } else if (path.includes('hallows') || path.includes('deathly') || path.includes('book 7') || path.includes('book7') || path.match(/[\\/]7\.\s+/)) {
      bookId = 7;
    }

    if (bookId) {
      const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      // Audio formats
      if (['.mp3', '.m4a', '.wav', '.ogg', '.aac', '.flac', '.m4b'].includes(ext)) {
        state.books[bookId].chapters.push(file);
      } 
      // Image formats (covers)
      else if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        // Prefer images named cover, folder, or art
        const name = file.name.toLowerCase();
        if (!state.books[bookId].cover || name.includes('cover') || name.includes('folder') || name.includes('front')) {
          state.books[bookId].cover = file;
        }
      }
    }
  });

  // Sort chapters numerically for each book
  for (let key in state.books) {
    const book = state.books[key];
    book.chapters.sort((a, b) => {
      return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
    });
    
    // Create URL for cover image if found
    if (book.cover) {
      book.coverUrl = URL.createObjectURL(book.cover);
    }
  }

  // Load PDF document
  if (state.pdfFile) {
    try {
      pdfLoadingIndicator.style.display = 'block';
      const arrayBuffer = await state.pdfFile.arrayBuffer();
      state.pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      console.log(`PDF Loaded! Total Pages: ${state.pdfDoc.numPages}`);
      pdfLoadingIndicator.style.display = 'none';
      updateSubtitlesPlaceholder("PDF file loaded successfully. Play a chapter to sync and view text.");
    } catch (err) {
      console.error('Error loading PDF:', err);
      pdfLoadingIndicator.style.display = 'none';
      updateSubtitlesPlaceholder("Failed to parse PDF file. Subtitles may not load.");
    }
  } else {
    updateSubtitlesPlaceholder("No PDF file found in folder. Place 'harrypotter full.pdf' in the folder to see subtitles.");
  }

  // Check if we loaded any audiobooks
  const totalChapters = Object.values(state.books).reduce((sum, b) => sum + b.chapters.length, 0);
  if (totalChapters === 0) {
    alert("No Harry Potter audiobook chapter files found. Please make sure the folder contains audio files (MP3/M4A).");
    return;
  }

  // Switch screens
  welcomeScreen.style.display = 'none';
  playerDashboard.style.display = 'grid';
  floatingDrawerBtn.style.display = 'flex';

  // Build UI
  renderBookTabs();
  initDrawerSelectors();

  // Load first book and chapter
  let firstValidBookId = Object.keys(state.books).find(id => state.books[id].chapters.length > 0);
  if (firstValidBookId) {
    selectBook(parseInt(firstValidBookId));
  }
}

// Update the placeholder text inside the subtitles view
function updateSubtitlesPlaceholder(message) {
  subtitlesContainer.innerHTML = `
    <div class="subtitles-placeholder">
      <i class="fa-solid fa-book-open-reader"></i>
      <p>${message}</p>
    </div>
  `;
}

// Render tabs in the sidebar
function renderBookTabs() {
  bookTabsContainer.innerHTML = '';
  
  for (let key in state.books) {
    const bookId = parseInt(key);
    const book = state.books[bookId];
    if (book.chapters.length === 0) continue; // skip books that have no chapters loaded

    const tab = document.createElement('div');
    tab.className = `book-tab ${state.activeBookId === bookId ? 'active' : ''}`;
    tab.dataset.id = bookId;
    
    // Thumbnail or dynamic parchment cover fallback
    let coverHtml = '';
    if (book.coverUrl) {
      coverHtml = `<img src="${book.coverUrl}" class="tab-cover-thumbnail" alt="${book.name}">`;
    } else {
      coverHtml = `<div class="tab-cover-thumbnail fallback-cover" style="background: var(--color-burgundy); border: 1px dashed var(--color-gold); display:flex; align-items:center; justify-content:center; color: var(--color-gold); font-size: 0.8rem; font-family: var(--font-magic);">HP${bookId}</div>`;
    }

    tab.innerHTML = `
      ${coverHtml}
      <div class="tab-details">
        <span class="tab-num">Book ${bookId}</span>
        <span class="tab-name">${book.name.replace(/^\d\.\s+/, '')}</span>
      </div>
    `;

    tab.addEventListener('click', () => selectBook(bookId));
    bookTabsContainer.appendChild(tab);
  }
}

// Select active book
function selectBook(bookId) {
  state.activeBookId = bookId;
  
  // Highlight active tab
  document.querySelectorAll('.book-tab').forEach(tab => {
    tab.classList.toggle('active', parseInt(tab.dataset.id) === bookId);
  });

  // Render chapters in list
  renderChaptersList();
  
  // Update Header titles
  chaptersListHeaderTitle.textContent = `${state.books[bookId].name} - Chapter List`;
  
  // Update Now Playing screen context if no track is playing, or if it matches active book
  if (state.activeChapterIndex === null) {
    selectChapter(0, false); // select first chapter but do not start playing automatically
  }
}

// Render chapter items
function renderChaptersList() {
  chaptersList.innerHTML = '';
  const chapters = state.books[state.activeBookId].chapters;

  chapters.forEach((file, index) => {
    const item = document.createElement('div');
    const isActive = (state.activeBookId === state.activeBookId && state.activeChapterIndex === index);
    item.className = `chapter-item ${isActive ? 'active' : ''}`;
    
    // Clean up filename for cleaner chapter title (remove extension and directory indicators)
    let displayTitle = file.name.replace(/\.[^/.]+$/, ""); // remove extension
    displayTitle = displayTitle.replace(/^\d+[-_\s]*/, ""); // remove leading index numbers

    item.innerHTML = `
      <span class="chapter-num">${index + 1}</span>
      <span class="chapter-name" title="${file.name}">${displayTitle}</span>
      <span class="chapter-play-indicator"><i class="fa-solid fa-volume-high"></i></span>
    `;

    item.addEventListener('click', () => {
      // Highlight selection
      document.querySelectorAll('.chapter-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      selectChapter(index, true);
    });

    chaptersList.appendChild(item);
  });
}

// Select active chapter and optionally play it
function selectChapter(chapterIndex, shouldPlay = true) {
  const book = state.books[state.activeBookId];
  if (!book || book.chapters.length === 0) return;

  state.activeChapterIndex = chapterIndex;
  const file = book.chapters[chapterIndex];

  // Set audio source
  const fileUrl = URL.createObjectURL(file);
  audioPlayer.src = fileUrl;

  // Clean titles
  let title = file.name.replace(/\.[^/.]+$/, ""); // remove ext
  title = title.replace(/^\d+[-_\s]*/, ""); // remove index
  
  // Update Now Playing Details
  activeBookTag.textContent = `Book ${state.activeBookId}`;
  activeChapterTag.textContent = `Chapter ${chapterIndex + 1}`;
  nowPlayingTitle.textContent = title;
  nowPlayingSubtitle.textContent = book.name.replace(/^\d\.\s+/, '');
  
  // Set cover picture
  if (book.coverUrl) {
    nowPlayingCover.src = book.coverUrl;
    nowPlayingCover.className = "now-playing-cover";
  } else {
    // Generate beautiful CSS fallback cover inside the container
    generateCoverFallback(state.activeBookId, book.name.replace(/^\d\.\s+/, ''));
  }

  // Scroll to active chapter item in listing
  const chapterItems = chaptersList.children;
  if (chapterItems && chapterItems[chapterIndex]) {
    // remove active class from all
    Array.from(chapterItems).forEach(item => item.classList.remove('active'));
    chapterItems[chapterIndex].classList.add('active');
    chapterItems[chapterIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Synced PDF text extraction
  loadChapterSubtitles(title, chapterIndex + 1);

  // Setup media session notification controls
  setupMediaSession(title, book.name.replace(/^\d\.\s+/, ''));

  if (shouldPlay) {
    playAudio();
  } else {
    pauseAudio();
  }
}

// CSS cover fallback generator
function generateCoverFallback(bookId, bookName) {
  const container = document.getElementById('coverArtContainer');
  // Remove existing fallback cover card if present
  const oldCard = container.querySelector('.fallback-card');
  if (oldCard) oldCard.remove();

  const card = document.createElement('div');
  card.className = 'fallback-card';
  card.innerHTML = `
    <div class="fallback-decor">✦ ✦ ✦</div>
    <div>
      <div style="font-size: 0.85rem; letter-spacing: 2px; color: var(--color-gold); font-family: var(--font-magic); margin-bottom:5px;">HARRY POTTER</div>
      <div class="fallback-title">${bookName}</div>
    </div>
    <div class="fallback-author">J.K. ROWLING</div>
  `;
  
  // Make cover image transparent so fallback shows behind it
  nowPlayingCover.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="3" height="4"></svg>';
  nowPlayingCover.className = "now-playing-cover fallback-cover";
  container.appendChild(card);
}

// Play/Pause functions
function playAudio() {
  // Initialize Web Audio API on user interaction if not done
  if (!state.isAudioInitialized) {
    initWebAudio();
  }

  audioPlayer.play()
    .then(() => {
      state.isPlaying = true;
      playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      navigator.mediaSession.playbackState = "playing";
    })
    .catch(err => {
      console.log('Play failed:', err);
    });
}

function pauseAudio() {
  audioPlayer.pause();
  state.isPlaying = false;
  playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  navigator.mediaSession.playbackState = "paused";
}

// Toggle Play/Pause button
playBtn.addEventListener('click', () => {
  if (state.isPlaying) {
    pauseAudio();
  } else {
    playAudio();
  }
});

// Previous/Next handlers
prevBtn.addEventListener('click', playPreviousChapter);
nextBtn.addEventListener('click', playNextChapter);

function playPreviousChapter() {
  if (state.activeChapterIndex > 0) {
    selectChapter(state.activeChapterIndex - 1, true);
  } else if (state.activeBookId > 1) {
    // Load last chapter of previous book if exists
    let prevBookId = state.activeBookId - 1;
    while (prevBookId >= 1 && state.books[prevBookId].chapters.length === 0) {
      prevBookId--;
    }
    if (prevBookId >= 1) {
      selectBook(prevBookId);
      selectChapter(state.books[prevBookId].chapters.length - 1, true);
    }
  }
}

function playNextChapter() {
  const chapters = state.books[state.activeBookId].chapters;
  if (state.activeChapterIndex < chapters.length - 1) {
    selectChapter(state.activeChapterIndex + 1, true);
  } else {
    // Load first chapter of next book if exists
    let nextBookId = state.activeBookId + 1;
    while (nextBookId <= 7 && state.books[nextBookId].chapters.length === 0) {
      nextBookId++;
    }
    if (nextBookId <= 7) {
      selectBook(nextBookId);
      selectChapter(0, true);
    } else {
      console.log("End of library playlist.");
      pauseAudio();
    }
  }
}

// Queue completion trigger: play next track on finish
audioPlayer.addEventListener('ended', () => {
  playNextChapter();
});

// Audio Time Update Progress
audioPlayer.addEventListener('timeupdate', () => {
  if (audioPlayer.duration) {
    const curTime = audioPlayer.currentTime;
    const dur = audioPlayer.duration;
    
    // Update progress bar percentage
    const pct = (curTime / dur) * 100;
    progressFill.style.width = `${pct}%`;
    progressHandle.style.left = `${pct}%`;

    // Time text labels
    currentTimeLabel.textContent = formatTime(curTime);
    durationLabel.textContent = formatTime(dur);

    // Sync subtitles scrolling
    updateSubtitleHighlight(curTime);
  }
});

audioPlayer.addEventListener('loadedmetadata', () => {
  durationLabel.textContent = formatTime(audioPlayer.duration || 0);
  progressFill.style.width = '0%';
  progressHandle.style.left = '0%';
});

// Format seconds into H:MM:SS or MM:SS
function formatTime(secs) {
  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor((secs % 3600) / 60);
  const seconds = Math.floor(secs % 60);
  const padSecs = seconds < 10 ? '0' + seconds : seconds;
  
  if (hours > 0) {
    const padMins = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${padMins}:${padSecs}`;
  }
  return `${minutes}:${padSecs}`;
}

// Progress Seek Bar Drag/Click Interaction
progressWrapper.addEventListener('click', (e) => {
  if (!audioPlayer.duration) return;
  const rect = progressWrapper.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const pct = Math.max(0, Math.min(1, clickX / rect.width));
  audioPlayer.currentTime = pct * audioPlayer.duration;
});

// Playback Speed Handler
speedSlider.addEventListener('input', (e) => {
  const val = parseFloat(e.target.value);
  speedValue.textContent = val.toFixed(1) + 'x';
  audioPlayer.playbackRate = val;
});

// Volume & Mute Handles
let preMuteVolume = 0.8;
volumeSlider.addEventListener('input', (e) => {
  const val = parseFloat(e.target.value);
  audioPlayer.volume = val;
  audioPlayer.muted = (val === 0);
  updateVolumeIcon(val);
});

muteBtn.addEventListener('click', () => {
  if (audioPlayer.muted) {
    audioPlayer.muted = false;
    audioPlayer.volume = preMuteVolume;
    volumeSlider.value = preMuteVolume;
    updateVolumeIcon(preMuteVolume);
  } else {
    preMuteVolume = audioPlayer.volume;
    audioPlayer.muted = true;
    audioPlayer.volume = 0;
    volumeSlider.value = 0;
    updateVolumeIcon(0);
  }
});

function updateVolumeIcon(val) {
  if (val === 0) {
    muteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
  } else if (val < 0.4) {
    muteBtn.innerHTML = '<i class="fa-solid fa-volume-low"></i>';
  } else {
    muteBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
  }
}

// Double click to forward / backward 10 seconds
coverArtContainer.addEventListener('dblclick', (e) => {
  if (!audioPlayer.duration) return;
  const rect = coverArtContainer.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const containerWidth = rect.width;
  
  if (clickX < containerWidth / 2) {
    // Double click left: Seek backward 10s
    audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 10);
    triggerSeekIndicator(seekLeftIndicator);
  } else {
    // Double click right: Seek forward 10s
    audioPlayer.currentTime = Math.min(audioPlayer.duration, audioPlayer.currentTime + 10);
    triggerSeekIndicator(seekRightIndicator);
  }
});

function triggerSeekIndicator(element) {
  element.classList.remove('show');
  void element.offsetWidth; // trigger reflow to restart css animation
  element.classList.add('show');
  setTimeout(() => element.classList.remove('show'), 600);
}

// ==========================================
// Media Session API (Background Notifications)
// ==========================================
function setupMediaSession(chapterTitle, bookName) {
  if ('mediaSession' in navigator) {
    const book = state.books[state.activeBookId];
    
    // Set metadata controls details
    const artwork = [];
    if (book.coverUrl) {
      artwork.push({ src: book.coverUrl, sizes: '512x512', type: 'image/png' });
    } else {
      artwork.push({ src: 'assets/icon.png', sizes: '512x512', type: 'image/png' });
    }

    navigator.mediaSession.metadata = new MediaMetadata({
      title: chapterTitle,
      artist: 'J.K. Rowling',
      album: bookName,
      artwork: artwork
    });

    // Action handlers for system lock screen / taskbar
    navigator.mediaSession.setActionHandler('play', playAudio);
    navigator.mediaSession.setActionHandler('pause', pauseAudio);
    navigator.mediaSession.setActionHandler('previoustrack', playPreviousChapter);
    navigator.mediaSession.setActionHandler('nexttrack', playNextChapter);
    
    navigator.mediaSession.setActionHandler('seekbackward', (details) => {
      const seekOffset = details.seekOffset || 10;
      audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - seekOffset);
    });
    
    navigator.mediaSession.setActionHandler('seekforward', (details) => {
      const seekOffset = details.seekOffset || 10;
      audioPlayer.currentTime = Math.min(audioPlayer.duration, audioPlayer.currentTime + seekOffset);
    });

    try {
      navigator.mediaSession.setActionHandler('seekto', (details) => {
        if (details.fastSeek && 'fastSeek' in audioPlayer) {
          audioPlayer.fastSeek(details.seekTime);
          return;
        }
        audioPlayer.currentTime = details.seekTime;
      });
    } catch(err) {
      console.log('seekto handler not supported');
    }
  }
}

// ==========================================
// PDF Text Extraction & Synchronized Subtitles
// ==========================================

async function loadChapterSubtitles(chapterTitle, chapterNum) {
  if (!state.pdfDoc) return;

  pdfLoadingIndicator.style.display = 'block';
  subtitlesContainer.innerHTML = '';
  state.paragraphs = [];
  
  try {
    let startPage = await findChapterPageInPDF(chapterTitle, chapterNum);
    console.log(`Found chapter on page: ${startPage}`);
    
    if (startPage > 0) {
      manualPageInput.value = startPage;
      await extractAndDisplaySubtitles(startPage);
    } else {
      updateSubtitlesPlaceholder(`Could not automatically locate page in PDF. Please enter starting page below.`);
      pdfLoadingIndicator.style.display = 'none';
    }
  } catch (err) {
    console.error('Error extracting subtitles:', err);
    updateSubtitlesPlaceholder("Error extracting text from PDF file.");
    pdfLoadingIndicator.style.display = 'none';
  }
}

// Search PDF pages to match chapter name
async function findChapterPageInPDF(chapterTitle, chapterNum) {
  // Use page range estimation to optimize search bounds
  const range = state.bookPageRanges[state.activeBookId] || { start: 1, end: state.pdfDoc.numPages };
  
  // Clean titles to search (words only, lowercased)
  const cleanTitle = chapterTitle.toLowerCase().replace(/[^a-z0-9]/g, " ").trim();
  const searchWords = cleanTitle.split(/\s+/).filter(w => w.length > 2); // only words > 2 letters
  
  const cacheKey = `${state.activeBookId}_${chapterNum}`;
  if (state.pdfChapterPagesCache[cacheKey]) {
    return state.pdfChapterPagesCache[cacheKey];
  }

  // Iterate over book pages
  console.log(`Searching chapter title inside pages ${range.start} to ${range.end}...`);
  
  for (let pageNum = range.start; pageNum <= range.end; pageNum++) {
    if (pageNum > state.pdfDoc.numPages) break;
    
    const page = await state.pdfDoc.getPage(pageNum);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(item => item.str).join(' ').toLowerCase();

    // Matching Strategy:
    // Try matching: "CHAPTER [NUM]" + Title words
    // Or just matches matching the title keywords closely on the page
    const hasChapterHeading = pageText.includes("chapter") && 
      (pageText.includes(` ${chapterNum} `) || pageText.includes(` ${numberToRoman(chapterNum)} `) || pageText.includes(` ${numberToEnglish(chapterNum)} `));

    let keywordMatches = 0;
    searchWords.forEach(word => {
      if (pageText.includes(word)) keywordMatches++;
    });

    const isMatch = hasChapterHeading || (searchWords.length > 0 && keywordMatches >= Math.min(3, searchWords.length));
    
    if (isMatch) {
      state.pdfChapterPagesCache[cacheKey] = pageNum;
      return pageNum;
    }
  }
  
  return -1;
}

// Convert numbers helper
function numberToRoman(num) {
  const roman = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
  let str = '';
  for (let i in roman ) {
    while ( num >= roman[i] ) {
      str += i;
      num -= roman[i];
    }
  }
  return str.toLowerCase();
}

function numberToEnglish(num) {
  const words = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];
  return words[num] || "";
}

// Extract content starting at pageNum for ~20 pages, or until next chapter starts
async function extractAndDisplaySubtitles(startPage) {
  subtitlesContainer.innerHTML = '';
  state.paragraphs = [];
  
  let pageOffset = 0;
  let fullText = '';
  let chapterEndDetected = false;
  
  // Read up to 25 pages (average chapter size) or until next chapter is detected
  while (pageOffset < 25 && (startPage + pageOffset) <= state.pdfDoc.numPages && !chapterEndDetected) {
    const currentPageNum = startPage + pageOffset;
    const page = await state.pdfDoc.getPage(currentPageNum);
    const textContent = await page.getTextContent();
    
    // Group text items, keep page breaks as spacing
    let lastY = -1;
    let pageText = '';
    
    textContent.items.forEach(item => {
      // Basic heuristic to add newlines for paragraphs (if vertical positioning shifts significantly)
      if (lastY !== -1 && Math.abs(item.transform[5] - lastY) > 12) {
        pageText += '\n';
      }
      pageText += item.str + ' ';
      lastY = item.transform[5];
    });

    // If it's a new page (except the first), check if a new chapter heading is starting
    if (pageOffset > 0) {
      const pageLower = pageText.toLowerCase();
      if (pageLower.includes("chapter") && (pageLower.includes("chapter one") || pageLower.includes("chapter 1") || pageLower.includes("chapter i") || pageLower.match(/chapter\s+\d+/))) {
        chapterEndDetected = true;
        break; // stop reading pages
      }
    }

    fullText += pageText + '\n';
    pageOffset++;
  }

  // Parse text into neat paragraphs (split by double newlines or significant spaces)
  const lines = fullText.split(/\n+/).map(l => l.trim()).filter(l => l.length > 15);
  
  if (lines.length === 0) {
    updateSubtitlesPlaceholder("Extracted pages were blank or contain unreadable formats.");
    pdfLoadingIndicator.style.display = 'none';
    return;
  }

  // Distribute paragraphs linearly over the audio track duration
  // Wait, if audioPlayer duration is not loaded yet, we calculate estimates on play
  const duration = audioPlayer.duration || 1800; // default to 30 mins estimate if not loaded
  const count = lines.length;
  const timePerPara = duration / count;

  lines.forEach((text, index) => {
    state.paragraphs.push({
      text: text,
      estimatedStart: index * timePerPara,
      estimatedEnd: (index + 1) * timePerPara
    });
  });

  // Render text to UI
  renderSubtitles();
  pdfLoadingIndicator.style.display = 'none';
}

function renderSubtitles() {
  subtitlesContainer.innerHTML = '';
  
  state.paragraphs.forEach((p, index) => {
    const el = document.createElement('p');
    el.className = 'subtitle-para';
    el.textContent = p.text;
    el.dataset.index = index;
    
    // Tap to seek audio to estimated timestamp
    el.addEventListener('click', () => {
      if (audioPlayer.duration) {
        const time = p.estimatedStart + state.syncOffset;
        audioPlayer.currentTime = Math.max(0, Math.min(audioPlayer.duration, time));
      }
    });

    // Double tap to sync: map current audio time to this paragraph
    el.addEventListener('dblclick', () => {
      if (audioPlayer.duration) {
        const curAudioTime = audioPlayer.currentTime;
        const estimatedTime = p.estimatedStart;
        // Shift syncOffset
        state.syncOffset = curAudioTime - estimatedTime;
        offsetSlider.value = state.syncOffset;
        offsetValue.textContent = (state.syncOffset >= 0 ? '+' : '') + state.syncOffset.toFixed(1) + 's';
        
        // Recalculate estimated timestamps for all paragraphs based on the new anchor!
        recalculateSubtitleTimings(index, curAudioTime);
      }
    });

    subtitlesContainer.appendChild(el);
  });
}

// Recalculate timings: anchor is active index, audio time is anchorTime
function recalculateSubtitleTimings(anchorIndex, anchorTime) {
  const duration = audioPlayer.duration;
  const totalParas = state.paragraphs.length;
  
  if (anchorIndex === 0) {
    // Align starting point
    const remainingTime = duration - anchorTime;
    const timePerPara = remainingTime / (totalParas - 1);
    
    state.paragraphs.forEach((p, index) => {
      p.estimatedStart = anchorTime + (index * timePerPara);
      p.estimatedEnd = anchorTime + ((index + 1) * timePerPara);
    });
  } else if (anchorIndex === totalParas - 1) {
    // Align ending point
    const timePerPara = anchorTime / (totalParas - 1);
    state.paragraphs.forEach((p, index) => {
      p.estimatedStart = index * timePerPara;
      p.estimatedEnd = (index + 1) * timePerPara;
    });
  } else {
    // Interpolate both sides of anchor
    const leftCount = anchorIndex;
    const rightCount = totalParas - 1 - anchorIndex;
    
    const leftTimePerPara = anchorTime / leftCount;
    const rightTimePerPara = (duration - anchorTime) / rightCount;
    
    state.paragraphs.forEach((p, index) => {
      if (index <= anchorIndex) {
        p.estimatedStart = index * leftTimePerPara;
        p.estimatedEnd = (index + 1) * leftTimePerPara;
      } else {
        const offset = index - anchorIndex;
        p.estimatedStart = anchorTime + (offset * rightTimePerPara);
        p.estimatedEnd = anchorTime + ((offset + 1) * rightTimePerPara);
      }
    });
  }
}

// Timing offset slider input
offsetSlider.addEventListener('input', (e) => {
  const val = parseFloat(e.target.value);
  state.syncOffset = val;
  offsetValue.textContent = (val >= 0 ? '+' : '') + val.toFixed(1) + 's';
});

// Manual Page loading
loadPageBtn.addEventListener('click', () => {
  const val = parseInt(manualPageInput.value);
  if (state.pdfDoc && val >= 1 && val <= state.pdfDoc.numPages) {
    pdfLoadingIndicator.style.display = 'block';
    extractAndDisplaySubtitles(val);
  }
});

// Highlight current subtitle line as audio plays
function updateSubtitleHighlight(time) {
  if (state.paragraphs.length === 0) return;
  
  const adjustedTime = time - state.syncOffset;
  let activeIndex = -1;

  // Search paragraph matching adjustedTime
  for (let i = 0; i < state.paragraphs.length; i++) {
    if (adjustedTime >= state.paragraphs[i].estimatedStart && adjustedTime < state.paragraphs[i].estimatedEnd) {
      activeIndex = i;
      break;
    }
  }

  // Update classes and auto scroll
  if (activeIndex !== -1 && activeIndex !== state.subtitleActiveIndex) {
    state.subtitleActiveIndex = activeIndex;
    
    const paras = subtitlesContainer.children;
    Array.from(paras).forEach((el, index) => {
      el.classList.toggle('active', index === activeIndex);
    });

    const activeEl = paras[activeIndex];
    if (activeEl) {
      // Smoothly scroll container to highlight
      const viewportHeight = subtitlesViewport.clientHeight;
      const scrollTarget = activeEl.offsetTop - (viewportHeight / 2) + (activeEl.clientHeight / 2);
      subtitlesViewport.scrollTo({
        top: Math.max(0, scrollTarget),
        behavior: 'smooth'
      });
    }
  }
}

// Subtitles search bar keyword highlighting
pdfSearchInput.addEventListener('input', (e) => {
  const keyword = e.target.value.toLowerCase().trim();
  const paras = subtitlesContainer.children;
  if (!paras) return;

  Array.from(paras).forEach((el, index) => {
    const text = state.paragraphs[index].text.toLowerCase();
    if (keyword.length > 1 && text.includes(keyword)) {
      el.style.borderRight = "3px solid var(--color-gold)";
      el.style.background = "rgba(212, 175, 55, 0.03)";
    } else {
      el.style.borderRight = "none";
      el.style.background = "";
    }
  });
});

// ==========================================
// Tabs Navigation
// ==========================================
document.querySelectorAll('.tab-header-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active from all tabs
    document.querySelectorAll('.tab-header-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    // Add active
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// ==========================================
// Quick Selection Drawer Logic
// ==========================================

function initDrawerSelectors() {
  drawerBookSelect.innerHTML = '';
  for (let key in state.books) {
    const bookId = parseInt(key);
    const book = state.books[bookId];
    if (book.chapters.length === 0) continue;

    const opt = document.createElement('option');
    opt.value = bookId;
    opt.textContent = book.name;
    drawerBookSelect.appendChild(opt);
  }

  drawerBookSelect.addEventListener('change', (e) => {
    renderDrawerChapters(parseInt(e.target.value));
  });
}

function renderDrawerChapters(bookId) {
  drawerChaptersList.innerHTML = '';
  const chapters = state.books[bookId].chapters;

  chapters.forEach((file, index) => {
    const item = document.createElement('div');
    const isActive = (state.activeBookId === bookId && state.activeChapterIndex === index);
    item.className = `chapter-item ${isActive ? 'active' : ''}`;
    
    let displayTitle = file.name.replace(/\.[^/.]+$/, "");
    displayTitle = displayTitle.replace(/^\d+[-_\s]*/, "");

    item.innerHTML = `
      <span class="chapter-num">${index + 1}</span>
      <span class="chapter-name">${displayTitle}</span>
      <span class="chapter-play-indicator"><i class="fa-solid fa-volume-high"></i></span>
    `;

    item.addEventListener('click', () => {
      selectBook(bookId);
      selectChapter(index, true);
      closeDrawer();
    });

    drawerChaptersList.appendChild(item);
  });
}

floatingDrawerBtn.addEventListener('click', () => {
  drawerOverlay.classList.add('open');
  drawerBookSelect.value = state.activeBookId;
  renderDrawerChapters(state.activeBookId);
});

[closeDrawerBtn, drawerOverlay].forEach(el => {
  el.addEventListener('click', (e) => {
    if (e.target === drawerOverlay || e.currentTarget === closeDrawerBtn) {
      closeDrawer();
    }
  });
});

function closeDrawer() {
  drawerOverlay.classList.remove('open');
}

// ==========================================
// Web Audio API & Particle Visualizer Logic
// ==========================================

let visualizerParticles = [];
let visualizerThemeColor = 'gold';
let particleCount = 150;
let animationFrameId = null;
let activeCanvas = null;

function initWebAudio() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    state.audioContext = new AudioContextClass();
    
    state.analyser = state.audioContext.createAnalyser();
    state.analyser.fftSize = 256;
    
    const source = state.audioContext.createMediaElementSource(audioPlayer);
    source.connect(state.analyser);
    state.analyser.connect(state.audioContext.destination);
    
    state.isAudioInitialized = true;
    console.log("Web Audio Context successfully initialized!");
    
    // Start animation loops
    startVisualizerLoop();
  } catch (err) {
    console.error("Failed to initialize Web Audio API:", err);
  }
}

// Start visualizer animation loops for both canvases
function startVisualizerLoop() {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);

  // Setup particle lists
  initParticles();

  // Handle canvas resize
  resizeCanvases();
  window.addEventListener('resize', resizeCanvases);

  function draw() {
    animationFrameId = requestAnimationFrame(draw);
    
    const bufferLength = state.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    state.analyser.getByteFrequencyData(dataArray);

    // Calculate average volume frequency
    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
      sum += dataArray[i];
    }
    const averageVolume = sum / bufferLength;

    // Draw on now playing cover overlay canvas
    drawCoverCanvas(dataArray, averageVolume);

    // Draw on large visualizer tab canvas
    drawTabCanvas(dataArray, averageVolume);
  }

  draw();
}

function resizeCanvases() {
  [visualizerCanvas, largeVisualizerCanvas].forEach(canvas => {
    if (!canvas) return;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  });
}

function initParticles() {
  visualizerParticles = [];
  for (let i = 0; i < 300; i++) {
    visualizerParticles.push({
      x: Math.random(), // relative
      y: Math.random(),
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.002,
      speedY: (Math.random() - 0.5) * 0.002,
      opacity: Math.random() * 0.5 + 0.2,
      pulse: Math.random() * 0.02
    });
  }
}

// Particle color theme selectors
function getThemeRGB(theme, alpha = 1) {
  const themes = {
    gold: `rgba(212, 175, 55, ${alpha})`,
    burgundy: `rgba(158, 27, 50, ${alpha})`,
    blue: `rgba(42, 117, 187, ${alpha})`,
    green: `rgba(46, 125, 50, ${alpha})`,
    purple: `rgba(142, 68, 173, ${alpha})`
  };
  return themes[theme] || themes.gold;
}

// Particle color theme glow selectors
function getThemeGlowRGB(theme) {
  const glows = {
    gold: '#ffeb3b',
    burgundy: '#ff1744',
    blue: '#29b6f6',
    green: '#66bb6a',
    purple: '#e040fb'
  };
  return glows[theme] || glows.gold;
}

// Draw now playing overlay sparks visualizer
function drawCoverCanvas(dataArray, averageVolume) {
  const ctx = visualizerCanvas.getContext('2d');
  const w = visualizerCanvas.width;
  const h = visualizerCanvas.height;
  
  ctx.clearRect(0, 0, w, h);
  
  if (!state.isPlaying) return;

  const count = Math.min(particleCount, 100);
  const scale = 1 + (averageVolume / 255) * 0.15; // pulsate cover visual effect
  
  ctx.shadowBlur = 8;
  ctx.shadowColor = getThemeGlowRGB(visualizerThemeColor);

  // Update and draw floating wand sparks inside cover art
  for (let i = 0; i < count; i++) {
    const p = visualizerParticles[i];
    
    // speed changes slightly based on volume
    const volMod = 1 + (averageVolume / 100);
    p.x += p.speedX * volMod;
    p.y += p.speedY * volMod;

    // boundaries loop
    if (p.x < 0) p.x = 1;
    if (p.x > 1) p.x = 0;
    if (p.y < 0) p.y = 1;
    if (p.y > 1) p.y = 0;

    const size = p.size * (1 + (averageVolume / 255) * 2);
    ctx.fillStyle = getThemeRGB(visualizerThemeColor, p.opacity);
    ctx.beginPath();
    ctx.arc(p.x * w, p.y * h, size, 0, Math.PI * 2);
    ctx.fill();
  }
  
  ctx.shadowBlur = 0; // reset
}

// Draw large fullscreen visualizer
function drawTabCanvas(dataArray, averageVolume) {
  const ctx = largeVisualizerCanvas.getContext('2d');
  const w = largeVisualizerCanvas.width;
  const h = largeVisualizerCanvas.height;
  
  ctx.clearRect(0, 0, w, h);
  
  // Background glowing spell circles
  const centerX = w / 2;
  const centerY = h / 2;
  const baseRadius = Math.min(w, h) * 0.25;
  const dynamicRadius = baseRadius + (averageVolume / 255) * 40;

  // Spell outer rings
  ctx.strokeStyle = getThemeRGB(visualizerThemeColor, 0.2);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(centerX, centerY, dynamicRadius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = getThemeRGB(visualizerThemeColor, 0.1);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(centerX, centerY, dynamicRadius * 1.2, 0, Math.PI * 2);
  ctx.stroke();

  // Spell sparks frequency spikes radiating outward
  const barCount = dataArray.length / 2;
  ctx.lineWidth = 3;
  ctx.strokeStyle = getThemeRGB(visualizerThemeColor, 0.8);
  ctx.shadowBlur = 10;
  ctx.shadowColor = getThemeGlowRGB(visualizerThemeColor);
  
  for (let i = 0; i < barCount; i++) {
    const freqVal = dataArray[i];
    const angle = (i / barCount) * Math.PI * 2;
    const spikeHeight = (freqVal / 255) * 120;
    
    const startX = centerX + Math.cos(angle) * dynamicRadius;
    const startY = centerY + Math.sin(angle) * dynamicRadius;
    const endX = centerX + Math.cos(angle) * (dynamicRadius + spikeHeight);
    const endY = centerY + Math.sin(angle) * (dynamicRadius + spikeHeight);

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }

  // Draw dancing sparks particles in large container
  ctx.shadowBlur = 5;
  for (let i = 0; i < particleCount; i++) {
    const p = visualizerParticles[i];
    const volMod = 1 + (averageVolume / 80);
    p.x += p.speedX * volMod;
    p.y += p.speedY * volMod;

    if (p.x < 0) p.x = 1;
    if (p.x > 1) p.x = 0;
    if (p.y < 0) p.y = 1;
    if (p.y > 1) p.y = 0;

    // Attract particles to the glowing spell center slightly if audio playing
    if (state.isPlaying) {
      const targetX = 0.5;
      const targetY = 0.5;
      p.x += (targetX - p.x) * 0.001 * (averageVolume / 100);
      p.y += (targetY - p.y) * 0.001 * (averageVolume / 100);
    }

    const size = p.size * (1 + (averageVolume / 255) * 1.5);
    ctx.fillStyle = getThemeRGB(visualizerThemeColor, p.opacity);
    ctx.beginPath();
    ctx.arc(p.x * w, p.y * h, size, 0, Math.PI * 2);
    ctx.fill();
  }
  
  ctx.shadowBlur = 0;
}

// Listen to options change
visualizerThemeSelect.addEventListener('change', (e) => {
  visualizerThemeColor = e.target.value;
});

particleCountSlider.addEventListener('input', (e) => {
  particleCount = parseInt(e.target.value);
});
