# 作品集部署

## 本地完整打包

在已经替换好图片的 GPT 预览浏览器中打开 http://127.0.0.1:5173/，点击右上方「打包发布版本」。请保持页面打开，直到提示打包完成。

该按钮会把当前浏览器中的上传图片、二维码、文案、图片顺序、隐藏状态和背景构图保存为网站正式资源，然后生成本地包。不会清理浏览器数据，不会自动上传到 GitHub。

当前电脑已配置输出到 `E:\开发\Jiaoyang-Portfolio`。其他电脑没有本地输出配置时，会保存到项目旁边的 `本地发布包/日期时间/`。以页面完成提示为准。

- `Jiaoyang-Portfolio.zip`：GitHub 部署源码，包含工作流、全部正式图片与发布配置。
- `Jiaoyang-Portfolio-static.zip`：已构建的根域名静态网站，给其他静态托管平台使用。
- `github-source` 和 `static-site` 文件夹：对应的未压缩文件。
- `打包记录.json`：导出日期、图片数量及配置记录。

不要直接上传现有的默认版本，必须等完整素材打包成功。打开已构建网站需要 HTTP 服务，不能直接双击 index.html。

## GitHub Pages

1. 解压 `Jiaoyang-Portfolio.zip`，将其中内容放到 GitHub 仓库根目录，确认隐藏的 `.github/workflows/deploy.yml` 也一起上传。不要把外层 `github-source` 文件夹套在仓库里面。
2. 仓库打开 **Settings → Pages → Build and deployment → Source**，选择 **GitHub Actions**。
3. 提交到 `main` 或 `master` 分支，打开 **Actions** 查看 `Deploy portfolio to GitHub Pages`。也可以点击 **Run workflow** 手动部署。
4. 成功后在 **Settings → Pages** 打开网址。无论仓库使用根域名还是 `/仓库名/` 子路径，图片和详情路由都会跟随工作流提供的路径。

正式构建固定关闭图片替换、上传、删除、文案编辑、排序和本地打包入口，不能通过网址参数解锁。公开网页使用打包资源，不依赖访客浏览器的上传记录。

GitHub 官方说明：https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
