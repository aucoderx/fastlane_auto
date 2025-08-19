#!/bin/bash

# Fastlane 配置管理脚本
# 支持 iOS 和 Android 发布渠道

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查必需的环境变量
check_required_env() {
    local required_vars="$1"

    local missing_vars=()

    for var in "${required_vars[@]}"; do
        echo "检查环境变量: $var, 值: ${!var}"
        if [[ -z "${!var}" ]]; then
            missing_vars+=("$var")
        fi
    done

    if [[ ${#missing_vars[@]} -gt 0 ]]; then
        log_error "缺少必需的环境变量:"
        for var in "${missing_vars[@]}"; do
            echo "  - $var"
        done
        return 1
    fi

    return 0
}

# ==== 项目下载到指定目录下 ====
# todo



# 创建目录结构
create_directory_structure() {
    log_info "创建 fastlane 目录结构..."

    mkdir -p "$1"/ios/fastlane/
    mkdir -p "$1"/android/fastlane/

    cp -r fastlane_templates/certificates "$1"/ios/fastlane/
    cp -r fastlane_templates/certificates "$1"/android/fastlane/
    cp -r fastlane_templates/metadata "$1"/ios/fastlane/
    cp -r fastlane_templates/metadata "$1"/android/fastlane/

    log_success "目录结构创建完成"
}

# 替换模板变量
replace_template_variables() {
    local template_file="$1"
    local output_file="$2"

    log_info "处理模板文件: $template_file -> $output_file"

    if [ "$template_file" != '' ]; then
        cp "$template_file" "$output_file"
    fi

    # 基本应用信息
    sed -i.bak "s/{{APP_NAME}}/${APP_NAME}/g" "$output_file"
    sed -i.bak "s/{{BUNDLE_ID}}/${BUNDLE_ID}/g" "$output_file"
    sed -i.bak "s/{{ANDROID_PACKAGE_NAME}}/${ANDROID_PACKAGE_NAME}/g" "$output_file"

    # Apple 相关
    sed -i.bak "s/{{APPLE_ID}}/${APPLE_ID}/g" "$output_file"
    sed -i.bak "s/{{TEAM_ID}}/${TEAM_ID}/g" "$output_file"
    sed -i.bak "s/{{APP_STORE_CONNECT_API_KEY_ID}}/${APP_STORE_CONNECT_API_KEY_ID}/g" "$output_file"
    sed -i.bak "s/{{APP_STORE_CONNECT_ISSUER_ID}}/${APP_STORE_CONNECT_ISSUER_ID}/g" "$output_file"

    # 可选环境变量
    sed -i.bak "s/{{WORKSPACE_PATH}}/${WORKSPACE_PATH:-${APP_NAME}.xcworkspace}/g" "$output_file"
    sed -i.bak "s/{{SCHEME_NAME}}/${SCHEME_NAME:-${APP_NAME}}/g" "$output_file"
    sed -i.bak "s/{{XCODEPROJ_PATH}}/${XCODEPROJ_PATH:-${APP_NAME}.xcodeproj}/g" "$output_file"
    sed -i.bak "s/{{PROVISIONING_PROFILE_NAME}}/${PROVISIONING_PROFILE_NAME:-match AppStore ${BUNDLE_ID}}/g" "$output_file"
    sed -i.bak "s#{{APP_STORE_CONNECT_API_KEY_PATH}}#${APP_STORE_CONNECT_API_KEY_PATH:-fastlane/certificates/AuthKey_${APP_STORE_CONNECT_API_KEY_ID}.p8}#g" "$output_file"
    sed -i.bak "s#{{GOOGLE_PLAY_JSON_KEY_PATH}}#${GOOGLE_PLAY_JSON_KEY_PATH}#g" "$output_file"
    sed -i.bak "s#{{ANDROID_PROJECT_DIR}}#${ANDROID_PROJECT_DIR:-android}#g" "$output_file"
    sed -i.bak "s/{{APP_CATEGORY}}/${APP_CATEGORY:-PRODUCTIVITY}/g" "$output_file"
    sed -i.bak "s/{{APP_SECONDARY_CATEGORY}}/${APP_SECONDARY_CATEGORY:-BUSINESS}/g" "$output_file"
    sed -i.bak "s/{{SUBMIT_FOR_REVIEW}}/${SUBMIT_FOR_REVIEW:-false}/g" "$output_file"
    sed -i.bak "s/{{AUTOMATIC_RELEASE}}/${AUTOMATIC_RELEASE:-false}/g" "$output_file"
    sed -i.bak "s/{{ITC_TEAM_ID}}/${ITC_TEAM_ID}/g" "$output_file"
    sed -i.bak "s/{{ITC_TEAM_NAME}}/${ITC_TEAM_NAME}/g" "$output_file"

    # 删除备份文件
    rm -f "${output_file}.bak"

    log_success "模板变量替换完成: $output_file"
}

# 生成配置文件
generate_config_files() {
    log_info "生成 fastlane 配置文件..."

    source fastlane_templates/.env

    replace_template_variables "fastlane_templates/Fastfile.ios.template" "$1/ios/fastlane/Fastfile"
    replace_template_variables "fastlane_templates/Appfile.template" "$1/ios/fastlane/Appfile"
    replace_template_variables "fastlane_templates/Gymfile.template" "$1/ios/fastlane/Gymfile"
    replace_template_variables "fastlane_templates/Deliverfile.template" "$1/ios/fastlane/Deliverfile"

    replace_template_variables "fastlane_templates/Fastfile.android.template" "$1/android/fastlane/Fastfile"
    replace_template_variables "fastlane_templates/Deliverfile.template" "$1/android/fastlane/Deliverfile"
    replace_template_variables "fastlane_templates/Appfile.template" "$1/android/fastlane/Appfile"

    replace_template_variables "" "$1/android/fastlane/metadata/android/en-US/full_description.txt"
    replace_template_variables "" "$1/android/fastlane/metadata/android/en-US/short_description.txt"
    replace_template_variables "" "$1/android/fastlane/metadata/android/en-US/title.txt"
    replace_template_variables "" "$1/android/fastlane/metadata/android/zh-CN/full_description.txt"
    replace_template_variables "" "$1/android/fastlane/metadata/android/zh-CN/short_description.txt"
    replace_template_variables "" "$1/android/fastlane/metadata/android/zh-CN/title.txt"
    replace_template_variables "" "$1/android/fastlane/metadata/android/default/privacy_url.txt"

    replace_template_variables "" "$1/ios/fastlane/metadata/ios/en-US/description.txt"
    replace_template_variables "" "$1/ios/fastlane/metadata/ios/en-US/keywords.txt"
    replace_template_variables "" "$1/ios/fastlane/metadata/ios/en-US/name.txt"
    replace_template_variables "" "$1/ios/fastlane/metadata/ios/zh-Hans/description.txt"
    replace_template_variables "" "$1/ios/fastlane/metadata/ios/zh-Hans/keywords.txt"
    replace_template_variables "" "$1/ios/fastlane/metadata/ios/zh-Hans/name.txt"

    log_success "配置文件生成完成"
}

# 创建元数据文件
create_metadata_files() {
    log_info "创建元数据文件..."

    # iOS 元数据
    mkdir -p "$1"/ios/fastlane/metadata/ios/zh-Hans
    mkdir -p "$1"/ios/fastlane/metadata/ios/en-US

    # 创建基本的元数据文件
    echo "$APP_NAME" > "$1"/ios/fastlane/metadata/ios/zh-Hans/name.txt
    echo "$APP_NAME" > "$1"/ios/fastlane/metadata/ios/en-US/name.txt
    echo "${APP_DESCRIPTION:-A great mobile application}" > "$1"/ios/fastlane/metadata/ios/zh-Hans/description.txt
    echo "${APP_DESCRIPTION:-A great mobile application}" > "$1"/ios/fastlane/metadata/ios/en-US/description.txt
    echo "${APP_KEYWORDS:-app,mobile,ios}" > "$1"/ios/fastlane/metadata/ios/zh-Hans/keywords.txt
    echo "${APP_KEYWORDS:-app,mobile,ios}" > "$1"/ios/fastlane/metadata/ios/en-US/keywords.txt

    # Android 元数据
    mkdir -p "$1"/android/fastlane/metadata/android/zh-CN
    mkdir -p "$1"/android/fastlane/metadata/android/en-US

    echo "$APP_NAME" > "$1"/android/fastlane/metadata/android/zh-CN/title.txt
    echo "$APP_NAME" > "$1"/android/fastlane/metadata/android/en-US/title.txt
    echo "${APP_SHORT_DESCRIPTION:-A great mobile app}" > "$1"/android/fastlane/metadata/android/zh-CN/short_description.txt
    echo "${APP_SHORT_DESCRIPTION:-A great mobile app}" > "$1"/android/fastlane/metadata/android/en-US/short_description.txt
    echo "${APP_DESCRIPTION:-A great mobile application}" > "$1"/android/fastlane/metadata/android/zh-CN/full_description.txt
    echo "${APP_DESCRIPTION:-A great mobile application}" > "$1"/android/fastlane/metadata/android/en-US/full_description.txt

    log_success "元数据文件创建完成"
}

# 创建部署脚本
create_deployment_scripts() {
    log_info "创建部署脚本..."
    cp "fastlane_templates/deploy_android.sh" "$1/android/fastlane/deploy_android.sh"
    cp "fastlane_templates/deploy_ios.sh" "$1/ios/fastlane/deploy_ios.sh"

    cp "fastlane_templates/GemFile_android" "$1/android/GemFile"
    cp "fastlane_templates/GemFile_ios" "$1/ios/GemFile"

    chmod +x "$1/android/fastlane/deploy_android.sh" "$1/ios/fastlane/deploy_ios.sh"
    log_success "部署脚本创建完成"
}

# 生成密钥
generate_android_keystore() {
    local output_dir="$1/keystore"
    local keystore_path="$output_dir/my-release-key.keystore"

    log_info "生成 Android 签名 keystore..."

    mkdir -p output_dir

    # 检查 keystore 是否已存在
    if [ -f "$keystore_path" ]; then
        log_info "Keystore 已存在: $keystore_path，跳过生成过程。"
        return 0  # 如果文件存在，返回成功并跳过创建
    fi

    mkdir -p "$output_dir"

    # 设置默认参数（可根据需要通过环境变量传入）
    local alias_name="${KEY_ALIAS:-my-key-alias}"
    local store_pass="${KEYSTORE_PASSWORD:-autocoder123}"
    local key_pass="${KEY_PASSWORD:-autocoder123}"
    local dname="${KEY_DNAME:-CN=Unknown, OU=Dev, O=MyCompany, L=City, S=State, C=CN}"

    # 生成 keystore
    keytool -genkeypair \
        -alias "$alias_name" \
        -keyalg RSA \
        -keysize 2048 \
        -validity 10000 \
        -keystore "$keystore_path" \
        -storepass "$store_pass" \
        -keypass "$key_pass" \
        -dname "$dname" \
        -noprompt

    if [ $? -eq 0 ]; then
        log_success "Keystore 生成成功: $keystore_path"
    else
        log_error "Keystore 生成失败"
        exit 1
    fi
}

# 到对应目录下，安装fastlane，和对应的依赖
install_fastlane() {
    local project_name="$1"

    for platform in ios android; do
        local platform_dir="$project_name/$platform"

        log_info "安装 $platform 的 fastlane 依赖..."

        # 创建 Gemfile（如果不存在）
        pushd "$platform_dir" > /dev/null

        # 安装依赖到 vendor/bundle
        bundle config set --local path 'vendor/bundle'
        bundle install

        popd > /dev/null

        log_success "$platform fastlane 安装完成"
    done
}

# 主函数
main() {

    log_info "开始设置 Fastlane 配置..."

    if [ "$#" -lt 1 ]; then
        log_error "缺少项目名称"
        exit 1
    fi

    project_name="$1"

    # 检查环境变量
    # if ! check_required_env "APP_NAME"; then
    #     log_error "请设置所有必需的环境变量后重新运行"
    #     exit 1
    # fi

    # 创建文件和目录
    create_directory_structure "$project_name"

    # 生成配置文件
    generate_config_files "$project_name"
    create_metadata_files "$project_name"
    create_deployment_scripts "$project_name"

    # 安卓密钥生成
    generate_android_keystore "$project_name"
    # 安装
    install_fastlane "$project_name"

    log_success "Fastlane 配置设置完成! 🎉"
}

# 运行主函数
main "$@"