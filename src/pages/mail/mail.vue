<template>

    <div class="main-all">

        <!-- 页面顶部 -->
        <div class="mail-header">
            <div class="header-content">
                <n-gradient-text type="info" size="24">Email App</n-gradient-text>

                <n-button text @click="$router.push('/')">
                    <n-icon size="20">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="currentColor" />
                        </svg>
                    </n-icon>
                </n-button>
            </div>
        </div>

        <div class="mail-container">


            <!-- 左侧菜单 -->
            <div class="mail-sidebar">
                <n-button type="primary" class="compose-btn" @click="showComposeModal = true" block>
                    <template #icon>
                        <n-icon><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor" />
                            </svg></n-icon>
                    </template>
                    写邮件
                </n-button>

                <n-menu :options="menuOptions" v-model:value="selectedKey" />

                <n-divider>排序方式</n-divider>

                <n-menu :options="sortOptions" />

                <n-divider>标签</n-divider>

                <n-menu :options="labelOptions" />
            </div>

            <!-- 右侧内容区域 -->
            <div class="mail-content">
                <!-- 工具栏 -->
                <div class="mail-toolbar">
                    <div class="left-tools">
                        <n-button type="error" :disabled="!selectedMails.length" @click="handleDelete" ghost>
                            删除
                        </n-button>
                        <n-button v-if="currentFolder === 'trash'" type="success" :disabled="!selectedMails.length"
                            @click="handleRestore" ghost>
                            恢复
                        </n-button>
                    </div>
                    <div class="right-tools">
                        <n-input v-model:value="searchText" placeholder="搜索邮件" round>
                            <template #prefix>
                                <n-icon :component="SearchOutline" />
                            </template>
                        </n-input>
                    </div>
                </div>

                <!-- 邮件列表和预览区域 -->
                <div class="mail-main-content">
                    <!-- 邮件列表 -->
                    <div class="mail-list">
                        <el-table ref="multipleTableRef" :data="filteredMails" style="width: 100%"
                            @selection-change="handleSelectionChange" @row-click="handleMailClick">
                            <el-table-column type="selection" width="55" />
                            <el-table-column width="30">
                                <template #default="scope">
                                    <n-button text @click.stop="toggleStar(scope.row)">
                                        <n-icon :color="scope.row.starred ? '#ffd700' : '#ccc'">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <path
                                                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                                    fill="currentColor" />
                                            </svg>
                                        </n-icon>
                                    </n-button>
                                </template>
                            </el-table-column>
                            <el-table-column prop="from" label="发件人" width="200" show-overflow-tooltip />
                            <el-table-column label="主题" show-overflow-tooltip>
                                <template #default="scope">
                                    <div class="subject-cell">
                                        <span>{{ scope.row.subject }}</span>
                                        <n-tag v-if="scope.row.label" size="small"
                                            :type="getLabelType(scope.row.label)">
                                            {{ scope.row.label }}
                                        </n-tag>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="date" label="日期" width="180" show-overflow-tooltip />
                        </el-table>
                    </div>

                    <!-- 邮件预览 -->
                    <div class="mail-preview">
                        <template v-if="currentMail.id">
                            <div class="preview-header">
                                <h3>{{ currentMail.subject }}</h3>
                                <div class="sender-info">
                                    <n-avatar round size="small">{{ currentMail.from.charAt(0).toUpperCase()
                                        }}</n-avatar>
                                    <div class="sender-details">
                                        <p class="sender-name">{{ currentMail.from }}</p>
                                        <p class="send-time">{{ currentMail.date }}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="preview-content">
                                {{ currentMail.content }}
                            </div>
                            <div class="preview-actions">
                                <n-button type="primary" @click="handleReply" ghost>
                                    <template #icon>
                                        <n-icon><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"
                                                    fill="currentColor" />
                                            </svg></n-icon>
                                    </template>
                                    回复
                                </n-button>
                                <n-button @click="handleForward" ghost>
                                    <template #icon>
                                        <n-icon><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <path d="M14 9V5l7 7-7 7v-4.1c-5 0-8.5 1.6-11 5.1 1-5 4-10 11-11z"
                                                    fill="currentColor" />
                                            </svg></n-icon>
                                    </template>
                                    转发
                                </n-button>
                            </div>
                        </template>
                        <div v-else class="empty-preview">
                            <n-empty description="选择一封邮件以查看内容" />
                        </div>
                    </div>
                </div>


            </div>

            <!-- 写邮件对话框 -->
            <n-modal v-model:show="showComposeModal" style="width: 800px" preset="card" title="写邮件">
                <n-form ref="composeFormRef" :model="composeForm" :rules="rules">
                    <n-form-item label="收件人" path="to">
                        <n-input v-model:value="composeForm.to" placeholder="请输入收件人邮箱" />
                    </n-form-item>
                    <n-form-item label="主题" path="subject">
                        <n-input v-model:value="composeForm.subject" placeholder="请输入邮件主题" />
                    </n-form-item>
                    <n-form-item label="正文" path="content">
                        <n-input v-model:value="composeForm.content" type="textarea" placeholder="请输入邮件内容" :autosize="{
                    minRows: 10,
                    maxRows: 20
                }" />
                    </n-form-item>
                </n-form>
                <template #footer>
                    <n-space justify="end">
                        <n-button @click="showComposeModal = false">取消</n-button>
                        <n-button type="info" @click="handleSaveDraft">存草稿</n-button>
                        <n-button type="primary" @click="handleSend">发送</n-button>
                    </n-space>
                </template>
            </n-modal>

            <!-- 查看邮件对话框 -->
            <n-modal v-model:show="showViewModal" style="width: 800px" preset="card">
                <template #header>
                    <div class="mail-view-header">
                        <h3>{{ currentMail.subject }}</h3>
                        <p>发件人: {{ currentMail.from }}</p>
                        <p>时间: {{ currentMail.date }}</p>
                    </div>
                </template>
                <div class="mail-view-content">
                    {{ currentMail.content }}
                </div>
                <template #footer>
                    <n-space justify="end">
                        <n-button @click="showViewModal = false">关闭</n-button>
                        <n-button type="primary" @click="handleReply">回复</n-button>
                    </n-space>
                </template>
            </n-modal>
        </div>

    </div>


</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { SearchOutline } from '@vicons/ionicons5';
import type { TableInstance } from 'element-plus';
import { ElMessage } from 'element-plus';

// 菜单选项
const menuOptions = [
    {
        label: '收件箱',
        key: 'inbox',
        icon: renderIcon('mail')
    },
    {
        label: '已发送',
        key: 'sent',
        icon: renderIcon('send')
    },
    {
        label: '草稿箱',
        key: 'drafts',
        icon: renderIcon('document')
    },
    {
        label: '垃圾邮件',
        key: 'spam',
        icon: renderIcon('warning')
    },
    {
        label: '回收站',
        key: 'trash',
        icon: renderIcon('trash')
    }
];

// 排序选项
const sortOptions = [
    {
        label: '星标邮件',
        key: 'starred',
        icon: renderIcon('star')
    },
    {
        label: '重要邮件',
        key: 'important',
        icon: renderIcon('notification')
    }
];

// 标签选项
const labelOptions = [
    {
        label: '促销邮件',
        key: 'promotional',
        icon: renderIcon('folder'),
        color: '#ff7f50'
    },
    {
        label: '社交邮件',
        key: 'social',
        icon: renderIcon('folder'),
        color: '#ff69b4'
    },
    {
        label: '健康相关',
        key: 'health',
        icon: renderIcon('folder'),
        color: '#32cd32'
    }
];

// 状态变量
const selectedKey = ref('inbox');
const currentFolder = computed(() => selectedKey.value);
const searchText = ref('');
const selectedMails = ref([]);
const showComposeModal = ref(false);
const showViewModal = ref(false);
const currentPage = ref(1);
const pageSize = ref(10);
const totalMails = ref(100);

// 表格实例
const multipleTableRef = ref();

// 邮件数据（示例）
const mailData = ref([
    {
        id: 1,
        from: 'Maria Hernandez <abc@company.com>',
        subject: 'This book is a treatise on the theory...',
        content: 'This book is a treatise on the theory of ethics. According to most sources, Lorem ipsum can be traced back to a text composed by Cicero in 45 BC. Allegedly, a Latin scholar established the origin of the text.',
        date: 'Wed, Feb 19',
        label: 'social',
        starred: true
    },
    {
        id: 2,
        from: 'Mary Smith <mary@example.com>',
        subject: 'randomised words which don\'t look...',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        date: 'Mon, Feb 17',
        label: 'health',
        starred: false
    }
]);

// 筛选后的邮件列表
const filteredMails = computed(() => {
    return mailData.value
        .filter(mail => mail.folder === currentFolder.value || !mail.folder)
        .filter(mail =>
            searchText.value
                ? mail.subject.toLowerCase().includes(searchText.value.toLowerCase()) ||
                mail.from.toLowerCase().includes(searchText.value.toLowerCase())
                : true
        );
});

// 当前查看的邮件
const currentMail = ref({});

// 写邮件表单
const composeForm = ref({
    to: '',
    subject: '',
    content: ''
});

// 表单验证规则
const rules = {
    to: {
        required: true,
        message: '请输入收件人邮箱',
        trigger: 'blur'
    },
    subject: {
        required: true,
        message: '请输入邮件主题',
        trigger: 'blur'
    },
    content: {
        required: true,
        message: '请输入邮件内容',
        trigger: 'blur'
    }
};

// 处理选择变化
const handleSelectionChange = (val) => {
    selectedMails.value = val;
};

// 处理删除
const handleDelete = () => {
    if (selectedMails.value.length === 0) return;

    if (currentFolder.value === 'trash') {
        mailData.value = mailData.value.filter(
            mail => !selectedMails.value.find(m => m.id === mail.id)
        );
        ElMessage.success('邮件已永久删除');
    } else {
        selectedMails.value.forEach(mail => {
            const index = mailData.value.findIndex(m => m.id === mail.id);
            if (index !== -1) {
                mailData.value[index].folder = 'trash';
            }
        });
        ElMessage.success('邮件已移至回收站');
    }
};

// 处理恢复
const handleRestore = () => {
    selectedMails.value.forEach(mail => {
        const index = mailData.value.findIndex(m => m.id === mail.id);
        if (index !== -1) {
            mailData.value[index].folder = 'inbox';
        }
    });
    ElMessage.success('邮件已恢复');
};

// 处理星标
const toggleStar = (mail) => {
    mail.starred = !mail.starred;
};

// 获取标签类型
const getLabelType = (label) => {
    const labelOption = labelOptions.find(opt => opt.key === label);
    return labelOption ? labelOption.key : 'default';
};

// 渲染图标
function renderIcon(name) {
    return () => h('span', { class: `icon-${name}` });
}

// 处理发送邮件
const handleSend = () => {
    // TODO: 实现发送邮件的逻辑
    ElMessage.success('邮件已发送');
    showComposeModal.value = false;
    composeForm.value = {
        to: '',
        subject: '',
        content: ''
    };
};

// 处理保存草稿
const handleSaveDraft = () => {
    // TODO: 实现保存草稿的逻辑
    ElMessage.success('草稿已保存');
    showComposeModal.value = false;
};

// 处理回复邮件
const handleReply = () => {
    showComposeModal.value = true;
    composeForm.value = {
        to: currentMail.value.from,
        subject: `回复: ${currentMail.value.subject}`,
        content: `\n\n------------------ 原始邮件 ------------------\n发件人: ${currentMail.value.from}\n发送时间: ${currentMail.value.date}\n主题: ${currentMail.value.subject}\n\n${currentMail.value.content}`
    };
};

// 处理转发邮件
const handleForward = () => {
    showComposeModal.value = true;
    composeForm.value = {
        to: '',
        subject: `转发: ${currentMail.value.subject}`,
        content: `\n\n------------------ 转发邮件 ------------------\n发件人: ${currentMail.value.from}\n发送时间: ${currentMail.value.date}\n主题: ${currentMail.value.subject}\n\n${currentMail.value.content}`
    };
};

// 处理邮件点击
const handleMailClick = (row) => {
    currentMail.value = row;
};
</script>

<style scoped>
.mail-all {
    background-color: #ced2d6;
}

.mail-header {
    border-radius: 20px;
    margin: 20px 90px;
}

.header-content{
    display: flex;
    justify-content: space-between
}

.mail-container {
    display: flex;
    height: 100%;
    background-color: #f8fafd;
    margin: 0;
    overflow: hidden;
}

.mail-header {
    background-color: #fff;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
}

.mail-container {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    display: flex;
    height: calc(100vh - 140px);
    margin: 0;
    overflow: hidden;
}

.mail-sidebar {
    width: 240px;
    background-color: #fff;
    border-right: 1px solid #eee;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.compose-btn {
    margin-bottom: 16px;
}

.mail-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.mail-toolbar {
    padding: 16px;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.left-tools {
    display: flex;
    gap: 8px;
}

.right-tools {
    width: 300px;
}

.mail-main-content {
    flex: 1;
    display: flex;
    overflow: hidden;
}

.mail-list {
    width: 40%;
    border-right: 1px solid #eee;
    overflow-y: auto;
}

.mail-list .el-table__row {
    cursor: pointer;
}

.mail-list .el-table__row:hover {
    background-color: #f5f7fa;
}

.mail-preview {
    flex: 1;
    padding: 24px;
    background-color: #fff;
    overflow-y: auto;
}

.preview-header {
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid #eee;
}

.preview-header h3 {
    margin: 0 0 16px 0;
    font-size: 20px;
    color: #333;
}

.sender-info {
    display: flex;
    align-items: center;
    gap: 12px;
}

.sender-details {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.sender-name {
    font-size: 14px;
    color: #333;
    margin: 0;
}

.send-time {
    font-size: 12px;
    color: #999;
    margin: 0;
}

.preview-content {
    font-size: 14px;
    line-height: 1.6;
    color: #666;
    white-space: pre-wrap;
    margin-bottom: 24px;
}

.preview-actions {
    display: flex;
    gap: 12px;
}

.empty-preview {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.subject-cell {
    display: flex;
    align-items: center;
    gap: 8px;
}

.mail-pagination {
    padding: 16px;
    background-color: #fff;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: flex-end;
}
</style>