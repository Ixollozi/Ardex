// Форматирование текста в админке Django
document.addEventListener('DOMContentLoaded', function() {
    // Создаем панель форматирования для каждого текстового поля
    const textareas = document.querySelectorAll('textarea[name*="description"], textarea[name*="answer"]');
    
    textareas.forEach(function(textarea) {
        if (textarea.id && (textarea.name.includes('description') || textarea.name.includes('answer'))) {
            createFormattingToolbar(textarea);
            addPreviewToggle(textarea);
        }
    });
});

function createFormattingToolbar(textarea) {
    // Создаем контейнер для панели инструментов
    const toolbarContainer = document.createElement('div');
    toolbarContainer.className = 'formatting-toolbar';
    
    // Кнопки форматирования
    const buttons = [
        { name: 'bold', label: 'B', title: 'Жирный', tag: 'strong' },
        { name: 'italic', label: 'I', title: 'Курсив', tag: 'em' },
        { name: 'underline', label: 'U', title: 'Подчеркнутый', tag: 'u' },
        { name: 'strikethrough', label: 'S', title: 'Зачеркнутый', tag: 's' },
        { separator: true },
        { name: 'paragraph', label: '¶', title: 'Абзац', tag: 'p' },
        { name: 'h1', label: 'H1', title: 'Заголовок 1', tag: 'h1' },
        { name: 'h2', label: 'H2', title: 'Заголовок 2', tag: 'h2' },
        { name: 'h3', label: 'H3', title: 'Заголовок 3', tag: 'h3' },
        { separator: true },
        { name: 'code', label: '</>', title: 'Код', tag: 'code' },
        { name: 'quote', label: '"', title: 'Цитата', tag: 'blockquote' },
        { separator: true },
        { name: 'list', label: '•', title: 'Список', tag: 'ul' },
        { name: 'numbered-list', label: '1.', title: 'Нумерованный список', tag: 'ol' },
        { separator: true },
        { name: 'link', label: '🔗', title: 'Ссылка', tag: 'a' },
        { name: 'clear', label: '✕', title: 'Очистить форматирование', tag: null }
    ];
    
    buttons.forEach(function(button) {
        if (button.separator) {
            const separator = document.createElement('div');
            separator.style.width = '1px';
            separator.style.height = '24px';
            separator.style.background = 'var(--border-color)';
            separator.style.margin = '0 4px';
            toolbarContainer.appendChild(separator);
        } else {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `formatting-btn ${button.name}`;
            btn.innerHTML = button.label;
            btn.title = button.title;
            // подсказка для красивых tooltip в CSS
            btn.setAttribute('data-tooltip', button.title);
            btn.onclick = function() {
                formatText(textarea, button.tag, button.name);
            };
            toolbarContainer.appendChild(btn);
        }
    });
    
    // Вставляем панель перед текстовым полем
    textarea.parentNode.insertBefore(toolbarContainer, textarea);
    
    // Добавляем класс для стилизации
    textarea.classList.add('formatted');
}

function formatText(textarea, tag, command) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const beforeText = textarea.value.substring(0, start);
    const afterText = textarea.value.substring(end);
    
    let formattedText = '';
    
    if (command === 'clear') {
        // Удаляем все HTML теги
        formattedText = selectedText.replace(/<[^>]*>/g, '');
    } else if (command === 'link') {
        const url = prompt('Введите URL ссылки:');
        if (url) {
            formattedText = `<a href="${url}">${selectedText || 'Ссылка'}</a>`;
        } else {
            return;
        }
    } else if (command === 'list') {
        if (selectedText) {
            const lines = selectedText.split('\n').filter(line => line.trim());
            formattedText = '<ul>\n' + lines.map(line => `  <li>${line.trim()}</li>`).join('\n') + '\n</ul>';
        } else {
            formattedText = '<ul>\n  <li>Элемент списка</li>\n</ul>';
        }
    } else if (command === 'numbered-list') {
        if (selectedText) {
            const lines = selectedText.split('\n').filter(line => line.trim());
            formattedText = '<ol>\n' + lines.map(line => `  <li>${line.trim()}</li>`).join('\n') + '\n</ol>';
        } else {
            formattedText = '<ol>\n  <li>Элемент списка</li>\n</ol>';
        }
    } else if (command === 'quote') {
        if (selectedText) {
            formattedText = `<blockquote>${selectedText}</blockquote>`;
        } else {
            formattedText = '<blockquote>Цитата</blockquote>';
        }
    } else if (tag) {
        if (selectedText) {
            formattedText = `<${tag}>${selectedText}</${tag}>`;
        } else {
            formattedText = `<${tag}>Текст</${tag}>`;
        }
    }
    
    // Обновляем содержимое текстового поля
    textarea.value = beforeText + formattedText + afterText;
    
    // Восстанавливаем позицию курсора
    const newPosition = start + formattedText.length;
    textarea.setSelectionRange(newPosition, newPosition);
    textarea.focus();
}

// Добавляем предварительный просмотр форматированного текста
function addPreviewToggle(textarea) {
    // Проверяем, не добавлен ли уже предварительный просмотр
    if (textarea.nextElementSibling && textarea.nextElementSibling.classList.contains('preview-container')) {
        return;
    }
    
    const previewContainer = document.createElement('div');
    previewContainer.className = 'preview-container';
    previewContainer.style.display = 'none';
    previewContainer.style.marginTop = '8px';
    previewContainer.style.padding = '12px';
    previewContainer.style.border = '1px solid var(--border-color)';
    previewContainer.style.borderRadius = 'var(--radius-sm)';
    previewContainer.style.background = 'var(--bg-card)';
    previewContainer.style.maxHeight = '400px';
    previewContainer.style.overflowY = 'auto';
    
    const previewContent = document.createElement('div');
    previewContent.className = 'formatted-text';
    previewContainer.appendChild(previewContent);
    
    // Кнопка переключения предварительного просмотра
    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'formatting-btn';
    toggleBtn.innerHTML = '👁️ Предпросмотр';
    toggleBtn.setAttribute('data-tooltip', 'Предварительный просмотр');
    toggleBtn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (previewContainer.style.display === 'none') {
            // Обновляем содержимое предварительного просмотра
            previewContent.innerHTML = textarea.value || '<em style="color: var(--text-muted);">Нет содержимого для предварительного просмотра</em>';
            previewContainer.style.display = 'block';
            toggleBtn.innerHTML = '✕ Скрыть';
            toggleBtn.setAttribute('data-tooltip', 'Скрыть предварительный просмотр');
        } else {
            previewContainer.style.display = 'none';
            toggleBtn.innerHTML = '👁️ Предпросмотр';
            toggleBtn.setAttribute('data-tooltip', 'Предварительный просмотр');
        }
    };
    
    // Обновляем предварительный просмотр при изменении текста
    textarea.addEventListener('input', function() {
        if (previewContainer.style.display !== 'none') {
            previewContent.innerHTML = textarea.value || '<em style="color: var(--text-muted);">Нет содержимого для предварительного просмотра</em>';
        }
    });
    
    // Добавляем кнопку в панель инструментов
    const toolbar = textarea.previousElementSibling;
    if (toolbar && toolbar.classList.contains('formatting-toolbar')) {
        // Добавляем сепаратор перед кнопкой предпросмотра
        const separator = document.createElement('div');
        separator.style.width = '1px';
        separator.style.height = '24px';
        separator.style.background = 'var(--border-color)';
        separator.style.margin = '0 4px';
        toolbar.appendChild(separator);
        toolbar.appendChild(toggleBtn);
        textarea.parentNode.insertBefore(previewContainer, textarea.nextSibling);
    }
}
