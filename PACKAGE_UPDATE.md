# Package.json 更新说明

## 需要移除的依赖

从 `package.json` 的 `dependencies` 中移除以下包：

```json
{
  "dependencies": {
    "@prismicio/client": "^x.x.x",
    "@prismicio/react": "^x.x.x",
    "@prismicio/next": "^x.x.x",
    "@slicemachine/adapter-next": "^x.x.x"
  }
}
```

## 可选：添加的依赖

如果需要更好的类型支持，可以添加：

```json
{
  "devDependencies": {
    "@types/node": "^20.x.x"
  }
}
```

## 执行更新

```bash
# 移除 Prismic 相关包
npm uninstall @prismicio/client @prismicio/react @prismicio/next @slicemachine/adapter-next

# 清理 node_modules 和重新安装
rm -rf node_modules package-lock.json
npm install
```

## 验证

确保以下文件不再引用 Prismic：
- `src/app/**/*.tsx`
- `src/components/**/*.tsx`
- `src/lib/**/*.ts`

