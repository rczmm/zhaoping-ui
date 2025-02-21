<template>
    <div class="chat-page">
        <!-- 页面标题栏 -->
        <div class="chat-header">
            <div class="header-content">
                <n-gradient-text type="info" size="24">Chat App</n-gradient-text>
                <div class="header-right">
                    <n-breadcrumb>
                        <n-breadcrumb-item>Chat App</n-breadcrumb-item>
                        <n-breadcrumb-item>Chat App</n-breadcrumb-item>
                    </n-breadcrumb>
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

        <div class="chat-container">
            <!-- 左侧联系人列表 -->
            <div class="chat-sidebar">
                <div class="search-box">
                    <n-input v-model:value="searchText" placeholder="搜索联系人" round>
                        <template #prefix>
                            <n-icon :component="SearchOutline" />
                        </template>
                    </n-input>
                </div>

                <div class="contacts-list">
                    <div class="list-title">最近聊天</div>
                    <div v-for="contact in filteredContacts" :key="contact.id" class="contact-item"
                        :class="{ 'active': currentContact?.id === contact.id }" @click="selectContact(contact)">
                        <n-avatar round :size="40" :src="contact.avatar" :fallback-src="defaultAvatar" />
                        <div class="contact-info">
                            <div class="contact-name">{{ contact.name }}</div>
                            <div class="contact-role">{{ contact.role }}</div>
                            <div class="last-message">{{ contact.lastMessage }}</div>
                        </div>
                        <div class="contact-status" :class="contact.status"></div>
                    </div>
                </div>
            </div>

            <!-- 右侧聊天区域 -->
            <div class="chat-main">
                <template v-if="currentContact">
                    <!-- 聊天对象信息 -->
                    <div class="chat-header-info">
                        <div class="user-info">
                            <span class="user-name">{{ currentContact.name }}</span>
                            <span class="user-status" :class="currentContact.status">
                                {{ currentContact.status }}
                            </span>
                        </div>
                    </div>

                    <div class="chat-content-container">
                        <!-- 聊天记录区域 -->
                        <div class="chat-messages" ref="messageContainer">
                            <div v-for="message in currentChat" :key="message.id" class="message-item"
                                :class="{ 'message-mine': message.isMine }">
                                <n-avatar round :size="32" :src="message.isMine ? userAvatar : currentContact.avatar"
                                    :fallback-src="defaultAvatar" />
                                <div class="message-content">
                                    <div class="message-text">{{ message.content }}</div>
                                    <div class="message-time">{{ formatTime(message.time) }}</div>
                                </div>
                            </div>
                        </div>

                        <!-- 右侧媒体和附件区域 -->
                        <div class="media-attachments-sidebar">
                            <!-- 媒体文件区域 -->
                            <div class="media-section" v-if="currentMedia.length > 0">
                                <div class="section-title">媒体文件</div>
                                <div class="media-list">
                                    <div v-for="media in currentMedia" :key="media.id" class="media-item">
                                        <img :src="media.url" :alt="media.name" />
                                    </div>
                                </div>
                            </div>

                            <!-- 附件区域 -->
                            <div class="attachments-section" v-if="currentAttachments.length > 0">
                                <div class="section-title">附件</div>
                                <div class="attachments-list">
                                    <div v-for="file in currentAttachments" :key="file.id" class="attachment-item">
                                        <n-icon size="20">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <path
                                                    d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"
                                                    fill="currentColor" />
                                            </svg>
                                        </n-icon>
                                        <div class="file-info">
                                            <div class="file-name">{{ file.name }}</div>
                                            <div class="file-size">{{ formatFileSize(file.size) }}</div>
                                        </div>
                                        <n-button text type="primary" @click="downloadFile(file)">
                                            <n-icon size="20">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" fill="currentColor" />
                                                </svg>
                                            </n-icon>
                                        </n-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 消息输入区域 -->
                    <div class="chat-input">
                        <n-input v-model:value="messageText" type="textarea" placeholder="输入消息..." :autosize="{
                        minRows: 1,
                        maxRows: 4
                    }" @keydown.enter.prevent="sendMessage" />
                        <div class="input-actions">
                            <n-upload :show-file-list="false" @change="handleFileUpload">
                                <n-button text>
                                    <template #icon>
                                        <n-icon size="20">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <path
                                                    d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"
                                                    fill="currentColor" />
                                            </svg>
                                        </n-icon>
                                    </template>
                                </n-button>
                            </n-upload>
                            <n-button type="primary" @click="sendMessage">
                                发送
                            </n-button>
                        </div>
                    </div>
                </template>
                <div v-else class="empty-state">
                    <n-empty description="选择一个联系人开始聊天" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { SearchOutline } from '@vicons/ionicons5';

// 默认头像
const defaultAvatar = 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg';
const userAvatar = 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg';

// 状态变量
const searchText = ref('');
const messageText = ref('');
const currentContact = ref(null);

// 模拟数据
const contacts = ref([
    {
        id: 1,
        name: 'Alice Johnson',
        role: 'Designer',
        avatar: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
        status: 'online',
        lastMessage: '好的，我待会发给你'
    },
    {
        id: 2,
        name: 'Bob Smith',
        role: 'Developer',
        avatar: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
        status: 'offline',
        lastMessage: '项目进展如何？'
    }
]);

const currentChat = ref([
    {
        id: 1,
        content: '你好，能帮我看看这个设计稿吗？',
        time: new Date(Date.now() - 3600000),
        isMine: false
    },
    {
        id: 2,
        content: '当然可以，你发给我吧',
        time: new Date(Date.now() - 1800000),
        isMine: true
    }
]);

const currentMedia = ref([
    {
        id: 1,
        name: 'design.jpg',
        url: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
    }
]);

const currentAttachments = ref([
    {
        id: 1,
        name: 'project_brief.pdf',
        size: 1024576
    }
]);

// 计算属性：过滤后的联系人列表
const filteredContacts = computed(() => {
    return contacts.value.filter(contact =>
        contact.name.toLowerCase().includes(searchText.value.toLowerCase()) ||
        contact.role.toLowerCase().includes(searchText.value.toLowerCase())
    );
});

// 选择联系人
const selectContact = (contact) => {
    currentContact.value = contact;
};

// 发送消息
const sendMessage = () => {
    if (!messageText.value.trim()) return;

    currentChat.value.push({
        id: Date.now(),
        content: messageText.value,
        time: new Date(),
        isMine: true
    });

    messageText.value = '';
    scrollToBottom();
};

// 处理文件上传
const handleFileUpload = (data) => {
    // 处理文件上传逻辑
    console.log('File uploaded:', data);
};

// 下载文件
const downloadFile = (file) => {
    // 处理文件下载逻辑
    console.log('Downloading file:', file);
};

// 格式化时间
const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit'
    });
};

// 格式化文件大小
const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// 滚动到底部
const messageContainer = ref(null);
const scrollToBottom = () => {
    if (messageContainer.value) {
        messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
    }
};
</script>

<style scoped>
.chat-page {
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #f8fafd;
}

.chat-header {
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

.chat-container {
    flex: 1;
    display: flex;
    margin: 0 90px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.chat-sidebar {
    width: 300px;
    border-right: 1px solid #eee;
    display: flex;
    flex-direction: column;
}

.search-box {
    padding: 16px;
    border-bottom: 1px solid #eee;
}

.contacts-list {
    flex: 1;
    overflow-y: auto;
}

.list-title {
    padding: 12px 16px;
    font-size: 14px;
    color: #999
}

.contact-item {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #f5f5f5;
    }

    &.active {
        background-color: #e6f7ff;
    }
}

.contact-info {
    flex: 1;
    margin-left: 12px;
    overflow: hidden;
}

.contact-name {
    font-size: 14px;
    font-weight: 500;
    color: #333;
    margin-bottom: 4px;
}

.contact-role {
    font-size: 12px;
    color: #666;
    margin-bottom: 4px;
}

.last-message {
    font-size: 12px;
    color: #999;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.contact-status {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-left: 8px;

    &.online {
        background-color: #52c41a;
    }

    &.offline {
        background-color: #d9d9d9;
    }
}

.chat-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #fff;
}

.chat-header-info {
    padding: 16px;
    border-bottom: 1px solid #eee;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 8px;
}

.user-name {
    font-size: 16px;
    font-weight: 500;
    color: #333;
}

.user-status {
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 10px;

    &.online {
        background-color: #f6ffed;
        color: #52c41a;
    }

    &.offline {
        background-color: #f5f5f5;
        color: #999;
    }
}

.chat-content-container {
    display: flex;
    flex: 1;
    overflow: hidden;
}

.chat-messages {
    flex: 1;
    padding: 16px;
    height: 50vh;
    overflow-y: auto;
    border-right: 1px solid #eee;
    scroll-behavior: auto;
}

.message-item {
    display: flex;
    margin-bottom: 16px;

    &.message-mine {
        flex-direction: row-reverse;

        .message-content {
            margin-left: 0;
            margin-right: 12px;
            background-color: #e6f7ff;
        }
    }
}

.message-content {
    margin-left: 12px;
    max-width: 70%;
}

.message-text {
    padding: 12px;
    background-color: #f5f5f5;
    border-radius: 8px;
    font-size: 14px;
    color: #333;
    word-break: break-word;
}

.message-time {
    font-size: 12px;
    color: #999;
    margin-top: 4px;
    text-align: right;
}

.media-attachments-sidebar {
    width: 300px;
    flex-shrink: 0;
    overflow-y: auto;
    background-color: #fff;
    display: flex;
    flex-direction: column;
}

.media-section,
.attachments-section {
    padding: 16px;
    border-bottom: 1px solid #eee;
}

.section-title {
    font-size: 14px;
    font-weight: 500;
    color: #333;
    margin-bottom: 12px;
}

.media-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 8px;
}

.media-item {
    aspect-ratio: 1;
    border-radius: 4px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.attachments-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.attachment-item {
    display: flex;
    align-items: center;
    padding: 8px;
    background-color: #f5f5f5;
    border-radius: 4px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #e6f7ff;
    }
}

.file-info {
    flex: 1;
    margin: 0 12px;
}

.file-name {
    font-size: 14px;
    color: #333;
    margin-bottom: 2px;
}

.file-size {
    font-size: 12px;
    color: #999;
}

.chat-input {
    padding: 16px;
    border-top: 1px solid #eee;
}

.input-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
}

.empty-state {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fafafa;
}
</style>