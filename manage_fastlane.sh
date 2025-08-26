#!/bin/bash

# Fastlane 配置管理脚本
# 支持 iOS 和 Android 发布渠道
# 使用方法: ./script.sh <项目名称> <平台:ios/android/all>

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

# 显示使用帮助
show_usage() {
    echo "使用方法:"
    echo "  $0 <项目名称> <平台>"
    echo ""
    echo "参数说明:"
    echo "  项目名称    - 要设置的项目名称"
    echo "  平台        - ios/android/all"
    echo ""
    echo "示例:"
    echo "  $0 MyApp ios        # 只设置iOS平台"
    echo "  $0 MyApp android    # 只设置Android平台"
    echo "  $0 MyApp all        # 设置所有平台"
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

# 创建iOS目录结构
create_ios_directory_structure() {
    local project_name="$1"
    log_info "创建 iOS fastlane 目录结构..."

    mkdir -p "$project_name"/ios/fastlane/
    cp -r fastlane_templates/certificates "$project_name"/ios/fastlane/
    cp -r fastlane_templates/metadata "$project_name"/ios/fastlane/
    cp -r fastlane_templates/screenshots "$project_name"/ios/fastlane/
    rm -rf "$project_name"/ios/fastlane/android

    log_success "iOS 目录结构创建完成"
}

# 创建Android目录结构
create_android_directory_structure() {
    local project_name="$1"
    log_info "创建 Android fastlane 目录结构..."

    mkdir -p "$project_name"/android/fastlane/
    cp -r fastlane_templates/certificates "$project_name"/android/fastlane/
    cp -r fastlane_templates/metadata "$project_name"/android/fastlane/

    log_success "Android 目录结构创建完成"
}

# 创建目录结构
create_directory_structure() {
    local project_name="$1"
    local platform="$2"

    case "$platform" in
        "ios")
            create_ios_directory_structure "$project_name"
            ;;
        "android")
            create_android_directory_structure "$project_name"
            ;;
        "all")
            create_ios_directory_structure "$project_name"
            create_android_directory_structure "$project_name"
            ;;
    esac
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
    sed -i.bak "s/{{PROJECT_NAME}}/${PROJECT_NAME}/g" "$output_file"
    sed -i.bak "s/{{APP_NAME}}/${APP_NAME}/g" "$output_file"
    sed -i.bak "s/{{BUNDLE_ID}}/${BUNDLE_ID}/g" "$output_file"
    sed -i.bak "s/{{ANDROID_PACKAGE_NAME}}/${ANDROID_PACKAGE_NAME}/g" "$output_file"
    sed -i.bak "s/{{APP_VERSION}}/${APP_VERSION}/g" "$output_file"
    sed -i.bak "s/{{APP_DESCRIPTION}}/${APP_DESCRIPTION}/g" "$output_file"
    sed -i.bak "s/{{APP_SHORT_DESCRIPTION}}/${APP_SHORT_DESCRIPTION}/g" "$output_file"
    sed -i.bak "s/{{APP_DESCRIPTION_EN}}/${APP_DESCRIPTION_EN}/g" "$output_file"
    sed -i.bak "s/{{APP_SHORT_DESCRIPTION_EN}}/${APP_SHORT_DESCRIPTION_EN}/g" "$output_file"
    sed -i.bak "s/{{APP_KEYWORDS}}/${APP_KEYWORDS}/g" "$output_file"
    sed -i.bak "s#{{PRIVACY_URL}}#${PRIVACY_URL}#g" "$output_file"

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


    sed -i.bak "s/{{AWS_ACCESS_KEY_ID}}/${AWS_ACCESS_KEY_ID}/g" "$output_file"
    sed -i.bak "s#{{AWS_SECRET_ACCESS_KEY}}#${AWS_SECRET_ACCESS_KEY}#g" "$output_file"
    sed -i.bak "s/{{AWS_REGION}}/${AWS_REGION}/g" "$output_file"
    sed -i.bak "s/{{BUCKET_NAME}}/${BUCKET_NAME}/g" "$output_file"


    # 删除备份文件
    rm -f "${output_file}.bak"

    log_success "模板变量替换完成: $output_file"
}

# 生成iOS配置文件
generate_ios_config_files() {
    local project_name="$1"
    log_info "生成 iOS fastlane 配置文件..."

    source fastlane_templates/.env

    replace_template_variables "fastlane_templates/Fastfile.ios.template" "$project_name/ios/fastlane/Fastfile"
    replace_template_variables "fastlane_templates/Appfile.template" "$project_name/ios/fastlane/Appfile"
    replace_template_variables "fastlane_templates/Gymfile.template" "$project_name/ios/fastlane/Gymfile"
    replace_template_variables "fastlane_templates/Deliverfile.template" "$project_name/ios/fastlane/Deliverfile"
    replace_template_variables "fastlane_templates/Matchfile_template" "$project_name/ios/fastlane/Matchfile"

    # iOS 元数据文件
    replace_template_variables "" "$project_name/ios/fastlane/metadata/en-US/description.txt"
    replace_template_variables "" "$project_name/ios/fastlane/metadata/en-US/keywords.txt"
    replace_template_variables "" "$project_name/ios/fastlane/metadata/en-US/name.txt"
    replace_template_variables "" "$project_name/ios/fastlane/metadata/zh-Hans/description.txt"
    replace_template_variables "" "$project_name/ios/fastlane/metadata/zh-Hans/keywords.txt"
    replace_template_variables "" "$project_name/ios/fastlane/metadata/zh-Hans/name.txt"

    log_success "iOS 配置文件生成完成"
}

# 生成Android配置文件
generate_android_config_files() {
    local project_name="$1"
    log_info "生成 Android fastlane 配置文件..."

    source fastlane_templates/.env

    replace_template_variables "fastlane_templates/Fastfile.android.template" "$project_name/android/fastlane/Fastfile"
    replace_template_variables "fastlane_templates/Deliverfile.template" "$project_name/android/fastlane/Deliverfile"
    replace_template_variables "fastlane_templates/Appfile.template" "$project_name/android/fastlane/Appfile"

    # Android 元数据文件
    replace_template_variables "" "$project_name/android/fastlane/metadata/android/en-US/full_description.txt"
    replace_template_variables "" "$project_name/android/fastlane/metadata/android/en-US/short_description.txt"
    replace_template_variables "" "$project_name/android/fastlane/metadata/android/en-US/title.txt"
    replace_template_variables "" "$project_name/android/fastlane/metadata/android/zh-CN/full_description.txt"
    replace_template_variables "" "$project_name/android/fastlane/metadata/android/zh-CN/short_description.txt"
    replace_template_variables "" "$project_name/android/fastlane/metadata/android/zh-CN/title.txt"
    replace_template_variables "" "$project_name/android/fastlane/metadata/android/default/privacy_url.txt"

    log_success "Android 配置文件生成完成"
}

# 生成配置文件
generate_config_files() {
    local project_name="$1"
    local platform="$2"

    case "$platform" in
        "ios")
            generate_ios_config_files "$project_name"
            ;;
        "android")
            generate_android_config_files "$project_name"
            ;;
        "all")
            generate_ios_config_files "$project_name"
            generate_android_config_files "$project_name"
            ;;
    esac
}

# 创建iOS部署脚本
create_ios_deployment_scripts() {
    local project_name="$1"
    log_info "创建 iOS 部署脚本..."

    cp "fastlane_templates/deploy_ios.sh" "$project_name/ios/fastlane/deploy_ios.sh"
    cp "fastlane_templates/GemFile_ios" "$project_name/ios/Gemfile"
    chmod +x "$project_name/ios/fastlane/deploy_ios.sh"

    log_success "iOS 部署脚本创建完成"
}

# 创建Android部署脚本
create_android_deployment_scripts() {
    local project_name="$1"
    log_info "创建 Android 部署脚本..."

    cp "fastlane_templates/deploy_android.sh" "$project_name/android/fastlane/deploy_android.sh"
    cp "fastlane_templates/GemFile_android" "$project_name/android/Gemfile"
    chmod +x "$project_name/android/fastlane/deploy_android.sh"

    log_success "Android 部署脚本创建完成"
}

# 创建部署脚本
create_deployment_scripts() {
    local project_name="$1"
    local platform="$2"

    case "$platform" in
        "ios")
            create_ios_deployment_scripts "$project_name"
            ;;
        "android")
            create_android_deployment_scripts "$project_name"
            ;;
        "all")
            create_ios_deployment_scripts "$project_name"
            create_android_deployment_scripts "$project_name"
            ;;
    esac
}

# 生成密钥（仅Android需要）
generate_android_keystore() {
    local project_name="$1"
    local output_dir="$project_name/keystore"
    local keystore_path="$output_dir/my-release-key.keystore"

    log_info "生成 Android 签名 keystore..."

    # 检查 keystore 是否已存在
    if [ -f "$keystore_path" ]; then
        log_info "Keystore 已存在: $keystore_path，跳过生成过程。"
        return 0
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

# 安装iOS fastlane
install_ios_fastlane() {
    local project_name="$1"
    local platform_dir="$project_name/ios"

    log_info "安装 iOS 的 fastlane 依赖..."

    pushd "$platform_dir" > /dev/null
    pwd
    ls

    # 安装依赖到 vendor/bundle
    bundle config set --local path 'vendor/bundle'
    bundle install
    popd > /dev/null

    log_success "iOS fastlane 安装完成"
}

# 安装Android fastlane
install_android_fastlane() {
    local project_name="$1"
    local platform_dir="$project_name/android"

    log_info "安装 Android 的 fastlane 依赖..."

    pushd "$platform_dir" > /dev/null
    pwd
    ls

    # 安装依赖到 vendor/bundle
    bundle config set --local path 'vendor/bundle'
    bundle install
    popd > /dev/null

    log_success "Android fastlane 安装完成"
}

# 到对应目录下，安装fastlane，和对应的依赖
install_fastlane() {
    local project_name="$1"
    local platform="$2"

    case "$platform" in
        "ios")
            install_ios_fastlane "$project_name"
            ;;
        "android")
            install_android_fastlane "$project_name"
            ;;
        "all")
            install_ios_fastlane "$project_name"
            install_android_fastlane "$project_name"
            ;;
    esac
}

# 验证平台参数
validate_platform() {
    local platform="$1"
    case "$platform" in
        "ios"|"android"|"all")
            return 0
            ;;
        *)
            log_error "无效的平台参数: $platform"
            log_error "支持的平台: ios, android, all"
            return 1
            ;;
    esac
}

# 主函数
main() {
    log_info "开始设置 Fastlane 配置..."

    # 检查参数数量
    if [ "$#" -lt 2 ]; then
        log_error "参数不足"
        show_usage
        exit 1
    fi

    local project_name="$1"
    local platform="$2"

    # 验证平台参数
    if ! validate_platform "$platform"; then
        show_usage
        exit 1
    fi

    log_info "项目名称: $project_name"
    log_info "目标平台: $platform"

    # 检查环境变量（如果需要的话）
    # if ! check_required_env "APP_NAME"; then
    #     log_error "请设置所有必需的环境变量后重新运行"
    #     exit 1
    # fi

    # 创建文件和目录
    create_directory_structure "$project_name" "$platform"

    # 生成配置文件
    generate_config_files "$project_name" "$platform"
    create_deployment_scripts "$project_name" "$platform"

    # 如果平台包含Android，则生成keystore
    if [ "$platform" = "android" ] || [ "$platform" = "all" ]; then
        generate_android_keystore "$project_name"
    fi

    # 安装fastlane
    install_fastlane "$project_name" "$platform"

    case "$platform" in
        "ios")
            log_success "iOS Fastlane 配置设置完成! 🍎"
            ;;
        "android")
            log_success "Android Fastlane 配置设置完成! 🤖"
            ;;
        "all")
            log_success "iOS 和 Android Fastlane 配置设置完成! 🎉"
            ;;
    esac
}

# 运行主函数
main "$@"