<template>
    <div class="notes-page">
        <!-- 页面标题栏 -->
        <div class="notes-header">
            <div class="header-content">
                <n-gradient-text type="info" size="24">Notes App</n-gradient-text>
                <div class="header-right">
                    <n-button text @click="$router.push('/')">
                        <n-icon size="20">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="currentColor" />
                            </svg>
                        </n-icon>
                    </n-button>
            
                </div>
            </div>
        </div>

        <div class="notes-container">
            <!-- 左侧边栏 -->
            <div class="notes-sidebar">
                <div class="search-box">
                    <n-input v-model:value="searchText" placeholder="搜索笔记" round>
                        <template #prefix>
                            <n-icon :component="SearchOutline" />
                        </template>
                    </n-input>
                    
                </div>

                <div class="notes-list">
                    <div v-for="note in filteredNotes" :key="note.id" 
                         class="note-item" 
                         :class="{ 'active': currentNote?.id === note.id }"
                         @click="selectNote(note)">
                        <div class="note-item-content">
                            <div class="note-title">{{ note.title }}</div>
                            <div class="note-date">{{ formatDate(note.lastModified) }}</div>
                        </div>
                        <n-button text @click.stop="handleDeleteNote(note)">
                            <n-icon :size="20">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor" />
                                </svg>
                            </n-icon>
                        </n-button>
                    </div>
                </div>
            </div>

    

            <!-- 右侧编辑区域 -->
            <div class="notes-edit-area" :style="{ backgroundColor: currentNote?.color || '#ffffff' }">
                <div class="edit-area-header">
                    <n-button type="primary" class="add-note-btn" @click="handleAddNote">
                        <template #icon>
                            <n-icon><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor" />
                                </svg></n-icon>
                        </template>
                        Add Notes
                    </n-button>
                </div>
                <template v-if="currentNote">
                    <div class="edit-header">
                        <n-input v-model:value="editingTitle" placeholder="笔记标题" style="margin-right: 20px;"/>
                        <n-button type="primary" @click="handleChangeTitle" ghost>Change Title</n-button>
                    </div>
                    <n-input
                        v-model:value="currentNote.content"
                        type="textarea"
                        placeholder="在此输入笔记内容..."
                        :autosize="{
                            minRows: 10,
                            maxRows: 20
                        }"
                        @input="handleContentChange"
                    />
                    <div class="color-picker">
                        <n-button @click="showColorPicker = true">Change Notes Color</n-button>
                        <n-popover v-model:show="showColorPicker" trigger="manual">
                            <template #trigger>
                                <div style="width: 0"></div>
                            </template>
                            <div class="color-options">
                                <div v-for="color in colorOptions" 
                                     :key="color"
                                     class="color-option"
                                     :style="{ backgroundColor: color }"
                                     @click="handleColorChange(color)">
                                </div>
                            </div>
                        </n-popover>
                    </div>
                </template>
                <div v-else class="empty-state">
                    <n-empty description="选择一个笔记或创建新笔记" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { SearchOutline } from '@vicons/ionicons5';
import { ElMessage } from 'element-plus';

// 状态变量
const notes = ref([
    {
        id: 1,
        title: '示例笔记 1',
        content: '这是一个示例笔记的内容...',
        lastModified: new Date(),
        color: '#ffffff'
    }
]);
const searchText = ref('');
const currentNote = ref(null);
const editingTitle = ref('');
const showColorPicker = ref(false);

// 颜色选项
const colorOptions = [
    '#ffffff', // 白色
    '#f0f8ff', // 爱丽丝蓝
    '#f5f5dc', // 米色
    '#ffe4e1', // 薄雾玫瑰
    '#e6e6fa', // 薰衣草
    '#f0fff0', // 蜜瓜
    '#fff0f5', // 薰衣草腮红
    '#f0ffff'  // 天蓝色
];

// 计算属性：过滤后的笔记列表
const filteredNotes = computed(() => {
    return notes.value.filter(note =>
        note.title.toLowerCase().includes(searchText.value.toLowerCase()) ||
        note.content.toLowerCase().includes(searchText.value.toLowerCase())
    );
});

// 格式化日期
const formatDate = (date) => {
    return new Date(date).toLocaleString();
};

// 选择笔记
const selectNote = (note) => {
    currentNote.value = note;
    editingTitle.value = note.title;
};

// 添加新笔记
const handleAddNote = () => {
    const newNote = {
        id: Date.now(),
        title: '新笔记',
        content: '',
        lastModified: new Date(),
        color: '#ffffff'
    };
    notes.value.unshift(newNote);
    selectNote(newNote);
    ElMessage.success('笔记创建成功');
};

// 删除笔记
const handleDeleteNote = (note) => {
    const index = notes.value.findIndex(n => n.id === note.id);
    if (index !== -1) {
        notes.value.splice(index, 1);
        if (currentNote.value?.id === note.id) {
            currentNote.value = null;
            editingTitle.value = '';
        }
        ElMessage.success('笔记删除成功');
    }
};

// 修改标题
const handleChangeTitle = () => {
    if (currentNote.value) {
        currentNote.value.title = editingTitle.value;
        currentNote.value.lastModified = new Date();
        ElMessage.success('标题修改成功');
    }
};

// 内容变化处理
const handleContentChange = () => {
    if (currentNote.value) {
        currentNote.value.lastModified = new Date();
    }
};

// 修改笔记颜色
const handleColorChange = (color) => {
    if (currentNote.value) {
        currentNote.value.color = color;
        showColorPicker.value = false;
        ElMessage.success('笔记颜色已更改');
    }
};
</script>

<style scoped>
.notes-page {
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #f8fafd;
}

.notes-header {
    margin: 20px 90px;
    background-color: #fff;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header-right {
    display: flex;
    align-items: center;
    gap: 12px;
}

.add-note-btn {
    margin-left: 12px;
}

.notes-container {
    flex: 1;
    display: flex;
    overflow: hidden;
}

.notes-sidebar {
    width: 300px;
    background-color: #fff;
    border-right: 1px solid #eee;
    display: flex;
    flex-direction: column;
}

.search-box {
    padding: 16px;
    border-bottom: 1px solid #eee;
}

.notes-list {
    flex: 1;
    overflow-y: auto;
    padding: 8px;
}

.note-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 8px;
}

.note-item:hover {
    background-color: #f5f5f5;
}

.note-item.active {
    background-color: #e6f4ff;
}

.note-item-content {
    flex: 1;
    margin-right: 8px;
}

.edit-header{
    display: flex;
}

.note-title {
    font-size: 14px;
    color: #333;
    margin-bottom: 4px;
}

.note-date {
    font-size: 12px;
    color: #999;
}

.notes-edit-area {
    flex: 1;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.edit-area-header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;
}

.add-note-btn {
    margin-left: auto;
}

.color-picker {
    margin-top: auto;
}

.color-options {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    padding: 8px;
}

.color-option {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    border: 1px solid #ddd;
    cursor: pointer;
}

.color-option:hover {
    transform: scale(1.1);
}

.empty-state {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>