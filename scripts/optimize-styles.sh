#!/bin/bash

# 批量优化后台页面样式的脚本
# 应用统一的设计规范

echo "开始批量优化页面样式..."

# 定义要优化的文件列表
FILES=(
  "app/pages/MerchantBackend/VIPDiscount/VIPDiscountConfigPage.tsx"
  "app/pages/MerchantBackend/AgentOrder/AgentOrderCreatePage.tsx"
  "app/pages/MerchantBackend/OldCustomer/InviteMemberPage.tsx"
  "app/pages/PlatformAdmin/PointsManagement/BaseRuleConfigPage.tsx"
  "app/pages/PlatformAdmin/PointsManagement/PointsAdjustmentPage.tsx"
  "app/pages/PlatformAdmin/PointsManagement/ValueAddedServicesPage.tsx"
  "app/pages/PlatformAdmin/PointsManagement/MemberLevelRatesPage.tsx"
  "app/pages/PlatformAdmin/MemberManagement/UpgradeRulesPage.tsx"
  "app/pages/PlatformAdmin/MemberManagement/DiscountRulesPage.tsx"
  "app/pages/PlatformAdmin/MemberManagement/MemberInvitationPage.tsx"
  "app/pages/PlatformAdmin/UserManagement/UserListPage.tsx"
)

# 备份并应用优化
for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "Processing: $file"

    # 备份原文件
    cp "$file" "${file}.backup"

    # 优化Card样式
    sed -i 's/<Card>/<Card className="rounded-xl border-slate-200 shadow-sm hover:shadow-md transition-shadow">/g' "$file"
    sed -i 's/<Card className="/<Card className="rounded-xl border-slate-200 shadow-sm hover:shadow-md transition-shadow /g' "$file"

    # 优化CardHeader样式
    sed -i 's/<CardHeader>/<CardHeader className="border-b border-slate-100">/g' "$file"

    # 优化按钮样式 - 主按钮
    sed -i 's/className="bg-blue-500/className="bg-blue-600/g' "$file"
    sed -i 's/hover:bg-blue-600/hover:bg-blue-700/g' "$file"

    echo "✓ Optimized: $file"
  else
    echo "✗ File not found: $file"
  fi
done

echo "批量优化完成！"
echo "备份文件保存为: *.backup"
