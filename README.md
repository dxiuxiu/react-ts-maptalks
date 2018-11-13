## 项目启动
+ yarn install
+ yarn start
+ yarn build 
## maptalks
### 配置
+ 安装yarn add maptalks
+ 导入maptalks 提示安装 尝试 "npm install @types/maptalks" (如果存在)，或者添加一个包含“声明模块‘maptalks’”的新声明文件(.d.ts)测试发现包 @types/maptalks不存在,然后尝试添加ts文件
+ 新增src/@types/index.d.ts文件，内容如下：
```
declare module 'maptalks'
```
+ 解决报错后开始编写实现代码，使用Promise时提示报错: “Promise”仅表示类型，但在此处却作为值使用。解决办法tsconfig.json添加配置节点：
```json
{
    "compilerOptions": {
        "lib": [ // 编译过程中需要引入的库文件的列表，不添加，TS会检测出错。
            "es6",
            "dom"
          ],
    }
}

```
+ 按需加载的配置
tsconfig.json
```json
{
    "compilerOptions": {
         "module": "esnext", // 组织代码的方式（'commonjs'， 'amd'， 'system'， 'umd'， 'es2015'，或'ESNext'）
         "moduleResolution": "node", // 增加"module": "esnext"节点后import antd报错,添加该配置节点后解决，指定模块解析策略，node或classic(ts1.6之前)
    }
}
```