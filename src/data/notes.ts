export type NoteCategoryId = "language" | "java" | "frontend" | "sql" | "llm" | "other"

export interface NoteCategory {
  id: NoteCategoryId
  label: string
  desc: string
}

export interface Note {
  slug: string
  title: string
  excerpt: string
  date: string
  tags: string[]
  category: NoteCategoryId
  readingTime: number
  content: {
    heading: string
    paragraphs: string[]
    code?:
      | { lang: string; text: string }
      | { lang: string; text: string }[]
    list?: string[]
    quote?: string
  }[]
}

/** 笔记分类：覆盖黑马程序员课程主线（语言 / Java / 前端 / SQL / 大模型） */
export const NOTE_CATEGORIES: NoteCategory[] = [
  { id: "language", label: "语言", desc: "Python · uv · 编程语言从基础到 Web 开发" },
  { id: "java", label: "Java", desc: "基础→JDBC · 工程化 · Spring Boot · MyBatis · API · 阿里云" },
  { id: "frontend", label: "前端", desc: "HTML/CSS/JS · Vue · React" },
  { id: "sql", label: "SQL", desc: "概念入门 · MySQL · Redis · SQL Server · VM/Linux" },
  { id: "llm", label: "大模型", desc: "大模型的底层 · Token→Transformer→推理 · 白描/MoLock 实战" },
  { id: "other", label: "其他", desc: "工具链 · 效率 · 杂记" },
]

export function getNoteCategory(id: NoteCategoryId): NoteCategory | undefined {
  return NOTE_CATEGORIES.find((c) => c.id === id)
}

export const NOTES: Note[] = [
  {
    slug: "python-basics-to-web",
    title: "Python 从基础到 Web：分块速成路线",
    excerpt:
      "按块拆解的学习路线：环境 → 语法 → 数据结构 → 函数 → 面向对象 → Web → uv。每块都带可直接运行的代码，从 print 到 Flask 接口，最后聊聊 Python 在商业、文员、科学、家庭甚至嵌入式里到底怎么用。",
    date: "2026-08-13",
    tags: ["Python", "Flask", "Web", "教程"],
    category: "language",
    readingTime: 34,
    content: [
      {
        heading: "第 1 块：环境准备——先跑起来再说",
        paragraphs: [
          "学 Python 第一步不是写代码，是搭环境。建议直接用 3.10+ 版本，语法特性全面，教程里出现的东西基本都支持。",
          "虚拟环境是必选项：每个项目独立装依赖，互不污染。Windows 下激活路径和 Linux 不一样，别记混。",
        ],
        code: {
          lang: "bash",
          text: "python --version                    # 确认版本 3.10+\npython -m venv .venv                # 建虚拟环境\n.venv\\Scripts\\activate            # Windows 激活（Linux/mac 用 source .venv/bin/activate）\npip install flask                   # 装依赖\npip config set global.index-url \\\n    https://pypi.tuna.tsinghua.edu.cn/simple   # 换清华镜像，下载快十倍",
        },
        list: [
          "pip 装包慢先换镜像，别硬等",
          "requirements.txt 用 pip freeze > requirements.txt 生成",
          "venv 目录不要提交到 Git",
        ],
        quote: "环境不隔离，依赖两行泪——每个项目都该有自己的 venv。",
      },
      {
        heading: "第 2 块：变量与数据类型",
        paragraphs: [
          "Python 是动态类型语言：变量不需要声明类型，直接赋值。常用内置类型就五个：int、float、str、bool、None。",
          "字符串格式化现在统一用 f-string，比 % 和 format 都直观，Python 3.6 之后就是主流写法。",
        ],
        code: {
          lang: "python",
          text: "name = \"llxpy\"     # str\nage = 20           # int\nscore = 88.5       # float\nis_ok = True       # bool\n\nprint(f\"名字:{name}, 年龄:{age}, 分数:{score}\")   # f-string\nprint(type(age))   # <class 'int'>\n\n# 类型转换：输入框拿到的都是字符串，记得转\nnum = int(\"42\")",
        },
        list: [
          "input() 返回的一定是 str，参与运算要先 int()/float()",
          "字符串拼接别用 + 连长句，f-string 更清晰",
          "None 判断用 is None，不要用 == None",
        ],
      },
      {
        heading: "第 3 块：流程控制",
        paragraphs: [
          "Python 用缩进代替花括号，这是新手第一个坎。统一用 4 个空格，别混 Tab，混了直接报 IndentationError。",
          "for + range 是最常用的循环组合；while 用的少，但死循环控制靠它。break 跳出、continue 跳过本轮。",
        ],
        code: {
          lang: "python",
          text: "# if 分支\nscore = 85\nif score >= 90:\n    print(\"优秀\")\nelif score >= 60:\n    print(\"及格\")\nelse:\n    print(\"不及格\")\n\n# for + range\nfor i in range(1, 6):    # 1 到 5，右开\n    print(i)\n\n# while\nn = 3\nwhile n > 0:\n    print(n)\n    n -= 1\n\n# 推导式写法（一行替代三行）\narr = [x * 2 for x in range(5) if x % 2 == 0]   # [0, 4, 8]",
        },
        list: [
          "range(5) 是 0~4，range(1, 6) 是 1~5，右边界不包含",
          "缩进错误是 Python 新手报错第一名",
          "列表推导式很 Pythonic，面试常考",
        ],
      },
      {
        heading: "第 4 块：数据结构三件套",
        paragraphs: [
          "List 有序可改，Dict 键值对，Set 去重。日常写业务，80% 的数据操作就是这三样加上切片。",
          "字典取值用 get() 给默认值，比直接 [] 取值安全——key 不存在时 [] 会直接抛 KeyError 把程序干崩。",
        ],
        code: {
          lang: "python",
          text: "nums = [1, 2, 3, 4, 5]\nnums.append(6)          # 尾部追加\nnums[0]                 # 1\nnums[1:4]               # 切片 -> [2, 3, 4]\n\nuser = {\"name\": \"llxpy\", \"age\": 20}\nuser[\"name\"]            # 取值\nuser.get(\"email\", \"无\")  # 安全取值，key 不存在返回默认值\nuser[\"email\"]           # 危险！KeyError\n\nseen = {1, 2, 2, 3}     # set 自动去重 -> {1, 2, 3}\n\n# 常用套路：按值排序\nsorted(nums, reverse=True)",
        },
        list: [
          "切片 [start:end] 左闭右开，nums[::-1] 直接反转",
          "字典遍历：for k, v in user.items()",
          "set 判断成员 O(1)，列表是 O(n)——去重优先用 set",
        ],
      },
      {
        heading: "第 5 块：函数与作用域",
        paragraphs: [
          "函数先定义后调用，参数支持默认值、*args 可变位置参数、**kwargs 可变关键字参数。",
          "lambda 匿名函数适合做排序 key 这种一次性小函数；复杂逻辑别用 lambda 硬写，可读性会崩。",
        ],
        code: {
          lang: "python",
          text: "def add(a, b=10):        # b 是默认参数\n    return a + b\n\nadd(1)      # 11\nadd(1, 2)   # 3\n\ndef collect(*args, **kwargs):   # 任意参数\n    print(args, kwargs)\n\ncollect(1, 2, name=\"llxpy\")   # (1, 2) {'name': 'llxpy'}\n\n# lambda 实战：按分数排序学生\nstudents = [(\"张三\", 88), (\"李四\", 95)]\nstudents.sort(key=lambda s: s[1], reverse=True)",
        },
        list: [
          "默认参数在函数定义时就固定，别用可变对象当默认值",
          "函数内修改全局变量要声明 global，一般用不到",
          "返回值没写 return，默认返回 None",
        ],
        quote: "函数写得短不是偷懒，是让你三个月后还能看懂自己写过什么。",
      },
      {
        heading: "第 6 块：文件读写与异常",
        paragraphs: [
          "文件操作永远用 with open()，它自动处理关闭，忘了 close 也不会泄漏句柄。编码统一指定 utf-8，Windows 默认编码坑过无数人。",
          "异常处理 try/except 兜住可能挂的代码；except 后面尽量写具体异常类型，裸 except 会把 bug 全吞了。",
        ],
        code: {
          lang: "python",
          text: "# 写文件\nwith open(\"data.txt\", \"w\", encoding=\"utf-8\") as f:\n    f.write(\"第一行\\n第二行\")\n\n# 读文件\nwith open(\"data.txt\", \"r\", encoding=\"utf-8\") as f:\n    content = f.read()\n\n# 异常\ntry:\n    num = int(\"abc\")\nexcept ValueError:\n    print(\"转不了数字\")\nexcept Exception as e:\n    print(f\"其他错误: {e}\")\nfinally:\n    print(\"无论成败都会执行\")",
        },
        list: [
          "读文件不加 encoding=\"utf-8\"，中文可能乱码或直接报错",
          "JSON 文件用 json.load() / json.dump()，别自己拼字符串",
          "异常要精确：ValueError、KeyError、FileNotFoundError 各归各",
        ],
      },
      {
        heading: "第 7 块：面向对象",
        paragraphs: [
          "类把数据（属性）和行为（方法）绑在一起。__init__ 是构造方法，self 指实例本身，每个实例方法第一个参数都是它。",
          "继承让子类复用父类能力再扩展；魔法方法 __str__ 控制打印显示，__len__ 让对象支持 len()。",
        ],
        code: {
          lang: "python",
          text: "class Dog:\n    def __init__(self, name):\n        self.name = name\n\n    def bark(self):\n        return f\"{self.name}: 汪汪\"\n\n    def __str__(self):\n        return f\"<Dog {self.name}>\"\n\nclass GuideDog(Dog):          # 继承\n    def bark(self):            # 重写父类方法\n        return f\"{self.name}: 正在引导\"\n\nd = GuideDog(\"小黑\")\nprint(d.bark())    # 小黑: 正在引导\nprint(d)           # <Dog 小黑>",
        },
        list: [
          "所有类默认继承 object，类名后不写 (Dog) 就是普通类",
          "属性都放 __init__ 里初始化，别写一半漏一半",
          "isinstance(d, Dog) 判断类型，比 type() == 更优雅",
        ],
      },
      {
        heading: "第 8 块：模块、包与常用标准库",
        paragraphs: [
          "一个 .py 文件就是模块，一个带 __init__.py 的目录就是包。import 进来直接用，代码拆开管理。",
          "标准库是最被低估的宝藏：os 管路径、json 管序列化、datetime 管时间、re 管正则。写业务前先想想标准库里有没有现成的。",
        ],
        code: {
          lang: "python",
          text: "import os\nimport json\nfrom datetime import datetime\n\n# 路径拼接：Windows 和 Linux 都能跑\npath = os.path.join(\"data\", \"notes.json\")\n\n# JSON 序列化\ndata = {\"name\": \"llxpy\", \"tags\": [\"python\", \"web\"]}\ntext = json.dumps(data, ensure_ascii=False)   # 中文不转义\nback = json.loads(text)\n\n# 时间格式化\nnow = datetime.now()\nprint(now.strftime(\"%Y-%m-%d %H:%M:%S\"))\n\n# 第三方库装完记得写进 requirements.txt\n# pip install requests\nimport requests\nr = requests.get(\"https://api.github.com/users/llxpy\")\nprint(r.status_code)",
        },
        list: [
          "json.dumps 加 ensure_ascii=False，否则中文全变 \\uXXXX",
          "os.path.join 比手拼 \"data/\" + name 靠谱，跨平台",
          "datetime.strftime 的 %Y %m %d 大小写敏感，记牢",
        ],
      },
      {
        heading: "第 9 块：Web 入门——第一个 Flask 应用",
        paragraphs: [
          "基础语法到这就够了，剩下的在写项目里补。Web 框架选 Flask：轻、小、一个文件能跑，最适合理解 Web 到底发生了什么。",
          "@app.route 是路由装饰器：把 URL 和函数绑在一起。浏览器访问 /，Flask 就调 index()，把返回值当响应发回去。",
        ],
        code: {
          lang: "python",
          text: "from flask import Flask, request, jsonify\n\napp = Flask(__name__)\n\n@app.route(\"/\")\ndef index():\n    return \"Hello, Python Web!\"\n\n# 动态路径：<int:uid> 限定类型\n@app.route(\"/user/<int:uid>\")\ndef user(uid):\n    return f\"用户 {uid}\"\n\n# JSON 接口：前后端分离的标准姿势\n@app.route(\"/api/login\", methods=[\"POST\"])\ndef login():\n    data = request.get_json()\n    return jsonify({\"ok\": True, \"name\": data.get(\"name\")})\n\nif __name__ == \"__main__\":\n    app.run(debug=True)   # debug=True 改代码自动重载",
        },
        list: [
          "GET 拿数据、POST 提交数据，接口语义别混",
          "jsonify() 返回的是标准 JSON 响应，前端直接 .json() 解析",
          "debug=True 只在本机开发用，上线必须关",
        ],
        quote: "Web 开发就是把「请求-处理-响应」这个循环玩明白，框架只是帮你把循环串起来。",
      },
      {
        heading: "第 10 块：Web 进阶——模板渲染",
        paragraphs: [
          "模板渲染：后端把数据填进 HTML 再返回，适合服务端渲染的页面。templates/ 目录放模板文件，render_template 渲染。",
          "Jinja2 语法只有两个核心：{{ 变量 }} 输出值，{% 语句 %} 写逻辑（for 循环、if 判断）。把 HTML 当外壳，Python 当数据源。",
        ],
        code: [
          {
            lang: "python",
            text: "from flask import Flask, render_template, request\n\napp = Flask(__name__)\n\nnotes = [\n    {\"id\": 1, \"title\": \"第 1 块：环境准备\"},\n    {\"id\": 2, \"title\": \"第 2 块：变量与数据类型\"},\n]\n\n@app.route(\"/notes\")\ndef notes():\n    return render_template(\"notes.html\", rows=notes)\n\nif __name__ == \"__main__\":\n    app.run(debug=True)",
          },
          {
            lang: "html",
            text: "<!-- templates/notes.html -->\n<ul>\n  {% for row in rows %}\n    <li>{{ row.title }}</li>\n  {% endfor %}\n</ul>",
          },
        ],
        list: [
          "模板文件必须放在 templates/ 目录，否则 render_template 找不到",
          "{{ }} 里的变量自动转义，XSS 不用太担心",
          "{% for %} 循环结尾要写 {% endfor %}，{% if %} 同理",
        ],
      },
      {
        heading: "第 11 块：Web 进阶——SQLite 持久化",
        paragraphs: [
          "数据持久化先从 SQLite 开始：零配置、单文件、标准库自带。等业务复杂了再换 MySQL，SQL 语法基本通用。",
          "SQL 参数永远用 ? 占位符传值，千万别用字符串拼接——这是 SQL 注入的大门，也是新手最容易犯的错。",
        ],
        code: {
          lang: "python",
          text: "import sqlite3\n\ndef get_db():\n    conn = sqlite3.connect(\"notes.db\")\n    conn.row_factory = sqlite3.Row   # 让查询结果能按列名取\n    return conn\n\ndef add_note(title: str):\n    conn = get_db()\n    conn.execute(\"INSERT INTO note (title) VALUES (?)\", (title,))\n    conn.commit()       # 写操作必须 commit\n    conn.close()\n\ndef list_notes():\n    conn = get_db()\n    rows = conn.execute(\"SELECT id, title FROM note ORDER BY id DESC\").fetchall()\n    conn.close()\n    return rows",
        },
        list: [
          "写操作（INSERT/UPDATE/DELETE）记得 commit()，不然白写",
          "SQL 参数用 ? 占位符传值，防 SQL 注入",
          "SQLite 适合学习和小项目，上线换 MySQL：pip install pymysql 改连接串",
        ],
        quote: "先会用 SQLite 把数据存住，再谈优化——Web 项目的根永远是数据。",
      },
      {
        heading: "第 12 块：uv——新时代的包管理器",
        paragraphs: [
          "uv 是 Rust 写的 Python 工具，把 pip、venv、requirements.txt 全替代了：装包快十倍，虚拟环境和依赖管理一把梭，黑马后续项目基本都换它。",
          "核心用法就三个：uv init 建项目、uv add 装依赖、uv run 跑脚本。它自动生成 pyproject.toml + uv.lock，依赖版本锁死，团队拉下来直接复现环境。",
        ],
        code: {
          lang: "bash",
          text: "# 安装 uv（Windows 推荐 winget）\nwinget install astral-sh.uv\n# 或 pip install uv\n\n# 建项目 + 装依赖 + 跑起来\nuv init my-app\ncd my-app\nuv add flask        # 装依赖，自动建虚拟环境\nuv run python app.py   # 在虚拟环境里跑\n\n# 常用命令\nuv venv              # 单独建虚拟环境\nuv python install 3.12   # 管理 Python 版本\nuv sync              # 按 uv.lock 恢复环境\nuv lock              # 更新锁文件",
        },
        list: [
          "uv.lock 要提交到 Git，团队克隆后 uv sync 一键还原环境",
          "uv add 会自动装进 .venv 并写进 pyproject.toml，不用手动 pip install",
          "老项目也能用：uv pip install -r requirements.txt 兼容旧习惯",
        ],
        quote: "环境管理该像 git 一样可复现——uv.lock 就是依赖的 commit 记录。",
      },
      {
        heading: "第 13 块：Python 能干什么——从办公到 Web",
        paragraphs: [
          "基础应用先说最实在的：办公自动化（批量处理 Excel/Word/PDF）、爬虫（自动收集数据）、数据分析、Web 后端、自动化测试，再往上就是 AI。Python 基本是「写业务脚本」的第一选择。",
          "实际使用里最常见的姿势不是写个大系统，而是写小脚本消灭重复劳动：一天一次的报表、每周整理的文件夹、偶尔要的统计数字，写个脚本几分钟跑完。",
        ],
        code: {
          lang: "python",
          text: "# 实际使用案例：批量重命名文件（文员、运营高频场景）\nimport os\n\nfolder = \"下载文件\"\nfor i, name in enumerate(os.listdir(folder)):\n    # 统一改成 001_原名 的格式\n    new = f\"{i+1:03d}_{name}\"\n    os.rename(os.path.join(folder, name), os.path.join(folder, new))",
        },
        list: [
          "脚本先跑通再优化，别一上来就写复杂架构",
          "批量操作前先备份，改错了能回滚",
          "路径写绝对路径还是相对路径要统一，跨目录跑最容易翻车",
        ],
      },
      {
        heading: "第 14 块：商业价值与数据统计优势",
        paragraphs: [
          "商业上 Python 值钱在「快」：开发周期短、生态全、招人容易，小公司一套 Python 系统能顶三套 Excel 手工流程。企业买的不是代码，是时间成本。",
          "数据统计是 Python 的统治区：pandas 处理几十万行数据秒级完成，matplotlib 一行画图。Excel 卡死的活它都轻松，报表、分析、可视化一条龙。",
        ],
        code: {
          lang: "python",
          text: "import pandas as pd\n\n# 读取 Excel，按部门统计销售额\ndf = pd.read_excel(\"销售数据.xlsx\")\nresult = df.groupby(\"部门\")[\"销售额\"].sum().sort_values(ascending=False)\nprint(result)\n\n# 画个简单的图\nimport matplotlib.pyplot as plt\nresult.plot(kind=\"bar\")\nplt.savefig(\"部门销售.png\")",
        },
        list: [
          "pandas 处理大表别用 Excel 打开硬看，处理完再导出",
          "matplotlib 画中文图要设置字体，不然全是方块",
          "数据清洗（去重、补空值）占 80% 工作量，别指望一条命令全自动",
        ],
      },
      {
        heading: "第 15 块：为什么文员最好会点 Python",
        paragraphs: [
          "文员的工作本质是处理信息：汇总表格、整理文件、发邮件、改格式。这些事 90% 是重复劳动，而 Python 最擅长的就是重复。",
          "会写脚本不是让你转行程序员，是让你把两小时的重复工作变成两分钟——同样下班，别人在加班做表，你脚本跑完在旁边喝茶。",
        ],
        code: {
          lang: "python",
          text: "# 文员高频：把一个文件夹里所有 Excel 合并成一个\nimport pandas as pd\nimport glob\n\nall_files = glob.glob(\"月度报表/*.xlsx\")\nmerged = pd.concat([pd.read_excel(f) for f in all_files])\nmerged.to_excel(\"全年汇总.xlsx\", index=False)",
        },
        list: [
          "先找最高频的重复任务下手，见效最快",
          "脚本命名说人话：rename_files.py、merge_excel.py，别叫 test1.py",
          "不会的操作先搜索，Python 的坑几乎都被踩过，答案全在网上",
        ],
        quote: "文员的 Python 不是编程，是给自己配了个永不喊累的实习生。",
      },
      {
        heading: "第 16 块：为什么各行各业都该会一点点",
        paragraphs: [
          "会计要对账、运营要拉数据、销售要整理客户、HR 要筛简历——每个岗位都有重复劳动，而 Python 的语法足够简单，非科班两周就能上手。",
          "会一点点 Python 的真正价值不是技能本身，而是「遇到重复劳动时，知道自己有第三条路」：要么手工干一小时，要么写脚本十分钟。这个思维转变比代码值钱。",
        ],
        list: [
          "别追求学完再干活，边用边学，卡住了再查",
          "AI 时代会提问更重要：让 AI 写脚本、你来改，门槛又低了一大截",
          "会一点就够拉开差距：全公司只有你会，你就是那个「搞不定找他」的人",
        ],
      },
      {
        heading: "第 17 块：科学与家庭——Python 无处不在",
        paragraphs: [
          "科学界 Python 是事实标准：NumPy 做矩阵运算、SciPy 做科学计算，机器学习三件套（NumPy/Pandas/Matplotlib）支撑了绝大多数论文，物理、生物、金融都在用。",
          "普通家庭也能用：记账统计、下载文件自动归类、定时提醒、爬个天气、给 NAS 写自动化脚本。十几行代码解决生活里的小麻烦，成就感拉满。",
        ],
        code: {
          lang: "python",
          text: "# 家庭应用：自动把下载文件夹按类型归类\nimport os\nimport shutil\n\nsource = r\"C:\\Users\\你\\Downloads\"\nrules = {\".jpg\": \"图片\", \".pdf\": \"文档\", \".zip\": \"压缩包\", \".mp4\": \"视频\"}\n\nfor name in os.listdir(source):\n    ext = os.path.splitext(name)[1].lower()\n    if ext in rules:\n        folder = os.path.join(source, rules[ext])\n        os.makedirs(folder, exist_ok=True)\n        shutil.move(os.path.join(source, name), folder)",
        },
        list: [
          "家庭脚本先跑一遍 dry run（只打印不执行），确认无误再真执行",
          "涉及删除的操作加回收站逻辑，别直接删",
          "定时任务 Windows 用任务计划程序，Mac 用 launchd，别开个窗口挂着",
        ],
      },
      {
        heading: "第 18 块：我的理解——灵活是天赋，规范是修养",
        paragraphs: [
          "Python 太自由了：一个文件从头写到尾也能跑，变量随便起名也能跑。这种自由让初学者爽，也让大项目崩溃——代码越长，越需要规矩。",
          "虽然 Python 一个文件能写很多东西，但我还是建议大家书写规范、按职责分类：函数拆开、文件分好、命名说人话、该注释就注释。规范不是束缚，是给三个月后的自己留门。",
        ],
        code: {
          lang: "python",
          text: "# ❌ 反面教材：一个文件全塞进去，变量叫 a b c\na = \"张三\"\nb = 88\nprint(a, \"考了\", b, \"分\")\n\n# ✅ 规范写法：函数分类、命名清楚、职责单一\ndef calc_grade(score: int) -> str:\n    \"\"\"根据分数返回等级\"\"\"\n    if score >= 90:\n        return \"优秀\"\n    if score >= 60:\n        return \"及格\"\n    return \"不及格\"\n\nstudent = {\"name\": \"张三\", \"score\": 88}\nprint(f\"{student['name']}：{calc_grade(student['score'])}\")",
        },
        list: [
          "一个函数只干一件事，超过二十行就考虑拆分",
          "变量名用单词全拼：total_price 别写 tp",
          "项目里按职责分文件：数据、工具、业务逻辑各放各的，别一锅炖",
        ],
        quote: "Python 允许你一个文件写天下，但我建议你把天下分成几个文件夹——代码规范不是约束，是给未来自己的情书。",
      },
      {
        heading: "第 19 块：嵌入式——MicroPython 与树莓派 Pico",
        paragraphs: [
          "你可能想不到：Python 在嵌入式领域也已经很成熟了。MicroPython 是 Python 3 的精简版，专门跑在单片机上，配合树莓派 Pico（只要二十来块）就能玩硬件——点灯、读传感器、连 WiFi 上报数据，全用 Python 写。",
          "为什么嵌入式也选 Python？开发效率碾压：不用烧录器，USB 插上就是 U 盘，把 .py 拖进去就运行；还有 REPL 交互式调试，写一行看一行。做智能家居、创客原型、学生实验，比 C 爽太多——当然，追求极致性能的地方还是得 C 上场，Python 管控制逻辑。",
        ],
        code: [
          {
            lang: "python",
            text: "# MicroPython：树莓派 Pico 点亮板载 LED（烧录后就能跑）\nfrom machine import Pin\nimport time\n\nled = Pin(25, Pin.OUT)   # Pico 板载 LED 在 GP25\nwhile True:\n    led.toggle()          # 翻转电平，LED 闪烁\n    time.sleep(1)",
          },
          {
            lang: "python",
            text: "# 读取 Pico 自带温度传感器\nimport machine\n\nsensor = machine.ADC(4)             # 温度通道\nvoltage = sensor.read_u16() * 3.3 / 65535\ntemp = 27 - (voltage - 0.706) / 0.001721\nprint(f\"{temp:.1f} °C\")",
          },
        ],
        list: [
          "MicroPython 是 Python 3 子集，标准库不全，别指望全部生态搬上来",
          "单片机内存按 KB 算，循环里别开大列表，分分钟溢出",
          "Pico W 才有 WiFi，普通 Pico 只能玩 IO 和传感器",
        ],
        quote: "嵌入式不再是 C 的专利——MicroPython 让硬件开发的门槛，低到会写 print 就能点灯。",
      },
    ],
  },
  {
    slug: "java-basics-to-jdbc",
    title: "Java 基础到 JDBC：从 HelloWorld 到连上数据库",
    excerpt:
      "Java 系列第一篇：环境 → 语法 → 面向对象 → 集合 → IO → JDBC → Maven → Spring Boot。21 个块从零到能连上 MySQL 做增删改查，还能用 Spring Boot 跑起第一个接口，最后聊聊为什么企业都在用 Java、Minecraft 为什么是 Java。",
    date: "2026-08-13",
    tags: ["Java", "JDBC", "教程"],
    category: "java",
    readingTime: 41,
    content: [
      {
        heading: "第 1 块：环境准备——JDK 与第一个程序",
        paragraphs: [
          "Java 要先装 JDK（建议 17，黑马课程统一用这个版本）。装完配好 JAVA_HOME 和 PATH，命令行里 java -version 能出版本号就成。",
          "Java 的编译运行是两段式：javac 把 .java 编译成 .class 字节码，java 再运行字节码。JVM 跨平台靠的就是这层字节码。",
        ],
        code: {
          lang: "java",
          text: "public class Hello {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, Java!\");\n    }\n}\n\n// 编译运行：\n// javac Hello.java   → 生成 Hello.class\n// java Hello         → 输出 Hello, Java!",
        },
        list: [
          "类名必须和文件名一致，且首字母大写",
          "main 方法是程序入口，格式是死的：public static void main(String[] args)",
          "中文乱码：源文件编码统一 UTF-8，别用系统默认编码",
        ],
        quote: "环境装不干净，后面全是玄学报错——Java 第一步就是配好 JDK。",
      },
      {
        heading: "第 2 块：变量与数据类型",
        paragraphs: [
          "Java 是强类型语言：变量必须先声明类型再赋值，类型不匹配直接编译报错，这比 Python 严，但也更安全。",
          "基本类型八个：byte/short/int/long/float/double/char/boolean，加上 String 引用类型，日常开发就够用了。",
        ],
        code: {
          lang: "java",
          text: "int age = 20;            // 整型\ndouble score = 88.5;     // 浮点\nchar grade = 'A';        // 字符\nboolean ok = true;       // 布尔\nString name = \"llxpy\";   // 引用类型\n\n// 类型转换\ndouble d = age;          // 小转大，自动\nint a = (int) score;     // 大转小，强转（可能丢精度）\n\n// 字符串拼接\nSystem.out.println(\"名字:\" + name + \", 年龄:\" + age);",
        },
        list: [
          "long 类型字面量要加 L：long big = 100L;",
          "float 要加 F：float f = 1.5F;，默认小数是 double",
          "字符串比较用 equals()，别用 ==（比较的是地址）",
        ],
      },
      {
        heading: "第 3 块：运算符与流程控制",
        paragraphs: [
          "if/else、for、while 和 C 系语言几乎一样，重点记两个新东西：增强 for 和 switch 的新箭头写法。",
          "增强 for（for-each）只适合遍历，需要下标或遍历时删元素还得用传统 for。",
        ],
        code: {
          lang: "java",
          text: "// if / else\nif (score >= 90) {\n    System.out.println(\"优秀\");\n} else if (score >= 60) {\n    System.out.println(\"及格\");\n} else {\n    System.out.println(\"不及格\");\n}\n\n// 传统 for + 增强 for\nint[] nums = {1, 2, 3};\nfor (int i = 0; i < nums.length; i++) {\n    System.out.println(nums[i]);\n}\nfor (int n : nums) {\n    System.out.println(n);\n}\n\n// switch 箭头写法（JDK 14+，不用写 break）\nswitch (day) {\n    case 1 -> System.out.println(\"周一\");\n    case 2, 3 -> System.out.println(\"工作日\");\n    default -> System.out.println(\"未知\");\n}",
        },
        list: [
          "数组越界是新手头号崩溃：nums[3] 直接 ArrayIndexOutOfBoundsException",
          "for-each 里别删集合元素，会出并发修改异常",
          "三元运算符 a > b ? a : b 是 if-else 的简写",
        ],
      },
      {
        heading: "第 4 块：数组与字符串",
        paragraphs: [
          "数组定长不可变，存同类型数据；业务中更常用集合（下一块）。字符串 String 是不可变对象，拼接频繁就换 StringBuilder。",
          "String 的方法要熟：length、charAt、substring、contains、split，面试和日常都高频。",
        ],
        code: {
          lang: "java",
          text: "// 数组\nint[] nums = new int[3];       // 定长，默认 0\nint[] arr = {1, 2, 3};         // 直接初始化\narr[0] = 10;                   // 改值\n\n// String 常用\nString s = \"hello, java\";\nSystem.out.println(s.length());       // 11\nSystem.out.println(s.charAt(0));      // h\nSystem.out.println(s.substring(0, 5));// hello\nSystem.out.println(s.contains(\"java\")); // true\n\n// 高频拼接用 StringBuilder\nStringBuilder sb = new StringBuilder();\nsb.append(\"a\").append(\"b\").append(\"c\");\nString result = sb.toString();   // abc",
        },
        list: [
          "String 用 + 拼接每次都会建新对象，循环里拼接必崩性能",
          "substring 左闭右开，substring(0, 5) 取 0~4",
          "判断字符串相等用 equals，判断空用 isEmpty()",
        ],
      },
      {
        heading: "第 5 块：面向对象——封装、继承、多态",
        paragraphs: [
          "Java 的一切都在类里。封装：属性私有 private + 提供 getter/setter；继承：子类 extends 父类复用能力；多态：父类引用指向子类对象，调用时看实际类型。",
          "构造方法 new 的时候自动执行，用来初始化属性；this 指当前对象，super 指父类。",
        ],
        code: {
          lang: "java",
          text: "public class Dog {\n    private String name;      // 封装：私有属性\n\n    public Dog(String name) { // 构造方法\n        this.name = name;\n    }\n\n    public String bark() {\n        return name + \": 汪汪\";\n    }\n}\n\npublic class GuideDog extends Dog {   // 继承\n    public GuideDog(String name) {\n        super(name);\n    }\n\n    @Override\n    public String bark() {             // 重写\n        return super.bark() + \"（正在引导）\";\n    }\n}\n\n// 多态：父类引用指向子类\nDog d = new GuideDog(\"小黑\");\nd.bark();",
        },
        list: [
          "一个 Java 文件只能有一个 public 类，名字和文件名一致",
          "子类构造方法第一行必须调 super()，不写默认调无参的",
          "final 类不能被继承，final 方法不能重写",
        ],
        quote: "封装藏细节，继承省重复，多态好扩展——面向对象三件套，面试必考。",
      },
      {
        heading: "第 6 块：集合框架",
        paragraphs: [
          "集合是业务代码的主角：List 存列表、Map 存键值对、Set 去重。接口管能力，实现类管性能，选型看场景。",
          "泛型 <String> 让集合在编译期就约束类型，拿出来的元素不用强转，还能防装错类型。",
        ],
        code: {
          lang: "java",
          text: "import java.util.*;\n\n// List：有序可重复\nList<String> list = new ArrayList<>();\nlist.add(\"a\");\nlist.get(0);\n\n// Map：键值对\nMap<String, Integer> map = new HashMap<>();\nmap.put(\"age\", 20);\nmap.get(\"age\");\nmap.getOrDefault(\"email\", 0);   // 安全取值\n\n// Set：去重\nSet<String> set = new HashSet<>();\nset.add(\"a\");\nset.add(\"a\");   // 加不进，已存在\n\n// 遍历 Map\nfor (Map.Entry<String, Integer> e : map.entrySet()) {\n    System.out.println(e.getKey() + \"=\" + e.getValue());\n}",
        },
        list: [
          "集合装基本类型要用包装类：List<Integer> 而不是 List<int>",
          "ArrayList 查快增删慢，LinkedList 增删快查慢",
          "HashMap 允许一个 null 键；HashSet 底层就是 HashMap",
        ],
      },
      {
        heading: "第 7 块：异常与 try-with-resources",
        paragraphs: [
          "异常分两类：受检异常（编译期强制处理）和运行时异常（不强制，但会炸）。try/catch 兜住，finally 收尾。",
          "JDK7+ 的 try-with-resources：实现了 AutoCloseable 的资源（流、连接）写在 try 括号里，用完全自动关，省掉 finally 手动 close。",
        ],
        code: {
          lang: "java",
          text: "// 经典异常处理\ntry {\n    int r = 10 / 0;\n} catch (ArithmeticException e) {\n    System.out.println(\"除零了:\" + e.getMessage());\n} catch (Exception e) {\n    e.printStackTrace();\n} finally {\n    System.out.println(\"无论成败都会执行\");\n}\n\n// 自定义异常\npublic class BizException extends RuntimeException {\n    public BizException(String msg) { super(msg); }\n}\n\n// 多异常合并：catch (IOException | SQLException e)",
        },
        list: [
          "异常要精确：先 catch 具体的，再 catch 宽泛的 Exception",
          "finally 里别写 return，会吞掉 try 里的返回值",
          "业务异常自定义，继承 RuntimeException 最省事",
        ],
      },
      {
        heading: "第 8 块：常用 API 与时间处理",
        paragraphs: [
          "老的时间类 Date/Calendar 又丑又容易踩坑，JDK8 之后用 java.time 包：LocalDate、LocalDateTime、DateTimeFormatter，线程安全、API 直观。",
          "日期字符串互转是接口开发高频操作，格式 pattern 记熟：yyyy-MM-dd HH:mm:ss。",
        ],
        code: {
          lang: "java",
          text: "import java.time.*;\nimport java.time.format.DateTimeFormatter;\n\nLocalDate today = LocalDate.now();\nLocalDateTime now = LocalDateTime.now();\n\n// 格式化\nDateTimeFormatter fmt = DateTimeFormatter.ofPattern(\"yyyy-MM-dd HH:mm:ss\");\nString text = now.format(fmt);\n\n// 字符串解析回时间\nLocalDateTime back = LocalDateTime.parse(\"2026-08-13 10:00:00\", fmt);\n\n// 时间运算（不可变，返回新对象）\nLocalDate tomorrow = today.plusDays(1);\n\n// 常用工具类\nMath.max(1, 2);\nInteger.parseInt(\"42\");\nString.join(\",\", list);",
        },
        list: [
          "LocalDateTime 是不可变对象，plusDays 要接收返回值",
          "SimpleDateFormat 线程不安全，多线程下用 DateTimeFormatter",
          "yyyy 是年，YYYY 是「周年份」，跨年时 YYYY 会算错——经典面试坑",
        ],
        quote: "时间处理是 Java 第一大坑，从今天起只用 java.time，别碰 Date。",
      },
      {
        heading: "第 9 块：IO 流与文件操作",
        paragraphs: [
          "文件操作记住一条原则：字符文件用 Reader/Writer，二进制文件用 InputStream/OutputStream，别混。",
          "现代写法优先 Files 工具类，一行读文件；传统流配合缓冲流 BufferedReader 提升性能。",
        ],
        code: {
          lang: "java",
          text: "import java.nio.file.*;\nimport java.io.*;\n\n// 现代写法：一行读写\nString content = Files.readString(Paths.get(\"data.txt\"));\nFiles.writeString(Paths.get(\"out.txt\"), \"写入内容\");\n\n// 传统流 + try-with-resources\ntry (BufferedReader br = new BufferedReader(\n        new FileReader(\"data.txt\"))) {\n    String line;\n    while ((line = br.readLine()) != null) {\n        System.out.println(line);\n    }\n} catch (IOException e) {\n    e.printStackTrace();\n}",
        },
        list: [
          "读文件编码指定 UTF-8：new FileReader(\"f\", StandardCharsets.UTF_8)",
          "流用完必须关，用 try-with-resources 自动处理",
          "大文件别一次 readAllBytes，用缓冲流逐行处理",
        ],
      },
      {
        heading: "第 10 块：多线程基础",
        paragraphs: [
          "线程两种写法：继承 Thread 或实现 Runnable（更推荐，Java 单继承不能浪费）。JDK8+ 直接用 lambda 写 Runnable。",
          "真正干活用线程池，别手动 new Thread：池化复用、控制并发数、好管理。",
        ],
        code: {
          lang: "java",
          text: "import java.util.concurrent.*;\n\n// 方式一：lambda 写法（Runnable 是函数式接口）\nThread t = new Thread(() -> System.out.println(\"子线程: \" + Thread.currentThread().getName()));\nt.start();\n\n// 方式二：线程池（生产推荐）\nExecutorService pool = Executors.newFixedThreadPool(4);\npool.execute(() -> System.out.println(\"池里的活\"));\npool.shutdown();   // 用完关闭\n\n// 线程安全：加锁\nsynchronized (lock) {\n    // 临界区\n}",
        },
        list: [
          "run() 是业务逻辑，start() 才是启动线程，直接调 run 等于白写",
          "共享变量多线程改，记得加锁或用原子类 AtomicInteger",
          "Executors 快捷创建，阿里规范建议手写 ThreadPoolExecutor 参数",
        ],
      },
      {
        heading: "第 11 块：JDBC 入门——连上 MySQL",
        paragraphs: [
          "JDBC 是 Java 访问数据库的官方接口：DriverManager 拿连接，Statement 发 SQL，ResultSet 收结果。所有 ORM（MyBatis 等）底层都是它。",
          "MySQL 驱动 jar 要提前装好（maven 依赖或手动引包），否则 Class.forName 直接 ClassNotFoundException。",
        ],
        code: {
          lang: "java",
          text: "import java.sql.*;\n\nString url = \"jdbc:mysql://localhost:3306/demo?useSSL=false&serverTimezone=Asia/Shanghai\";\nString user = \"root\";\nString pwd = \"123456\";\n\ntry (Connection conn = DriverManager.getConnection(url, user, pwd);\n     Statement st = conn.createStatement();\n     ResultSet rs = st.executeQuery(\"SELECT id, name FROM user\")) {\n\n    while (rs.next()) {\n        int id = rs.getInt(\"id\");\n        String name = rs.getString(\"name\");\n        System.out.println(id + \": \" + name);\n    }\n} catch (SQLException e) {\n    e.printStackTrace();\n}",
        },
        list: [
          "url 里的 serverTimezone 不配，时区会报错",
          "ResultSet 的 getInt/getString 参数是列名，别写下标",
          "连接、Statement、ResultSet 都要关，try-with-resources 一次搞定",
        ],
        quote: "JDBC 的 CRUD 学会，后面的框架全是它的语法糖。",
      },
      {
        heading: "第 12 块：JDBC 进阶——PreparedStatement 与事务",
        paragraphs: [
          "Statement 拼 SQL 有注入风险，一律用 PreparedStatement：SQL 先预编译，参数用 ? 占位，setXxx 传值，既防注入又省解析。",
          "多表操作必须挂事务：setAutoCommit(false)，全成功才 commit，出异常 rollback 回滚，数据才不会散架。",
        ],
        code: [
          {
            lang: "java",
            text: "// 增删改用 PreparedStatement\nString sql = \"INSERT INTO user(name, age) VALUES (?, ?)\";\ntry (Connection conn = DriverManager.getConnection(url, user, pwd);\n     PreparedStatement ps = conn.prepareStatement(sql)) {\n    ps.setString(1, \"llxpy\");\n    ps.setInt(2, 20);\n    int rows = ps.executeUpdate();   // 影响行数\n}\n\n// 事务：多表操作一起成功或一起失败\ntry (Connection conn = DriverManager.getConnection(url, user, pwd)) {\n    conn.setAutoCommit(false);\n    try {\n        // 多个 update/insert 在这\n        conn.commit();\n    } catch (SQLException e) {\n        conn.rollback();\n        throw e;\n    }\n}",
          },
          {
            lang: "java",
            text: "// 连接池：Druid 起步配置（生产不手写连接）\nDruidDataSource ds = new DruidDataSource();\nds.setUrl(url);\nds.setUsername(user);\nds.setPassword(pwd);\n\ntry (Connection conn = ds.getConnection()) {\n    // 从池里拿连接，用完归还\n}",
          },
        ],
        list: [
          "SQL 字符串拼接就是 SQL 注入的大门，PreparedStatement 是底线",
          "setAutoCommit(false) 忘写，事务就是摆设",
          "生产环境用连接池（Druid/HikariCP），不直接 DriverManager",
        ],
      },
      {
        heading: "第 13 块：Maven——构建与依赖管理",
        paragraphs: [
          "项目变大后，手动引 jar 包就是灾难：版本冲突、传递依赖、构建脚本一堆。Maven 解决两件事：依赖管理（中央仓库自动拉 jar）和构建（一条命令出可运行包）。",
          "核心是 pom.xml：groupId/artifactId/version 定位坐标，<dependencies> 声明依赖，Maven 自动把依赖的依赖也拉下来。阿里云镜像配好后下载快得多。",
        ],
        code: [
          {
            lang: "xml",
            text: "<!-- pom.xml 核心结构 -->\n<groupId>com.llxpy</groupId>\n<artifactId>demo</artifactId>\n<version>1.0.0</version>\n\n<dependencies>\n    <!-- MySQL 驱动：写 JDBC 必备 -->\n    <dependency>\n        <groupId>com.mysql</groupId>\n        <artifactId>mysql-connector-j</artifactId>\n        <version>8.0.33</version>\n    </dependency>\n    <!-- Druid 连接池 -->\n    <dependency>\n        <groupId>com.alibaba</groupId>\n        <artifactId>druid</artifactId>\n        <version>1.2.20</version>\n    </dependency>\n</dependencies>",
          },
          {
            lang: "bash",
            text: "# Maven 常用命令（IDEA 右侧 Maven 面板同款）\nmvn clean            # 清掉 target\nmvn compile         # 编译\nmvn test            # 跑测试\nmvn package         # 打包 jar/war\nmvn install         # 装到本地仓库，供别的模块引用\n\n# 依赖冲突排查\nmvn dependency:tree",
          },
        ],
        list: [
          "groupId/artifactId/version 三段坐标，全世界唯一标识一个包",
          "jar 版本冲突是新手噩梦：mvn dependency:tree 一键查清",
          "target/ 是构建产物，提交到 Git 就蠢了，.gitignore 记得加",
        ],
        quote: "Maven 管依赖和构建，项目才能从「一个人能跑」变成「谁都能跑」。",
      },
      {
        heading: "第 14 块：Spring Boot 是什么——标配的底气",
        paragraphs: [
          "Spring 生态统治 Java 企业开发十几年，但早期配置是「地狱」：一堆 XML、Tomcat 要单独装、部署要打 war 包。Spring Boot 把这套全干掉：自动装配、内嵌 Tomcat、起步依赖 starter，配置从几百行变成几行，一个 java -jar 直接跑。",
          "它的核心思想是「约定大于配置」+「自动装配」：按约定放好类，框架自动把 Bean 注入、把数据源配好、把 MVC 搭好——你只管写业务代码。现在新项目基本都是 Spring Boot，黑马课程主线就是它。",
        ],
        list: [
          "Spring Boot 是 Spring 的「开箱即用」版，不是新语言",
          "starter 依赖一加，功能自动装配，不用手动配置 Bean",
          "内嵌 Tomcat：打成 jar 后 java -jar xx.jar 就上线，不用装服务器",
        ],
        quote: "Spring Boot 的 slogan 是 just run——配置地狱之后，开发终于回归写业务本身。",
      },
      {
        heading: "第 15 块：第一个 Spring Boot 项目",
        paragraphs: [
          "建项目两条路：IDEA 的 Spring Initializr 向导，或 start.spring.io 网页生成后导入。选好 Java 17、Spring Boot 3.x，勾上 Web 依赖，生成后直接能跑。",
          "核心文件就两个：启动类（@SpringBootApplication，main 方法跑起来）和 application.yml（配置文件）。启动类必须放在包的最外层，否则子包的 Controller 扫不到，404 找到你怀疑人生。",
        ],
        code: [
          {
            lang: "java",
            text: "// 启动类：一切从这里开始\n@SpringBootApplication\npublic class DemoApplication {\n    public static void main(String[] args) {\n        SpringApplication.run(DemoApplication.class, args);\n    }\n}\n\n// Controller：第一个接口\n@RestController\npublic class HelloController {\n    @GetMapping(\"/hello\")\n    public String hello() {\n        return \"Hello, Spring Boot!\";\n    }\n}",
          },
          {
            lang: "yaml",
            text: "# application.yml：改端口、改数据源都在这\nserver:\n  port: 8080\n\nspring:\n  application:\n    name: demo",
          },
        ],
        list: [
          "启动类放最外层包，Controller 放它的子包，否则扫描不到 404",
          "端口被占：server.port 换一个，或者杀掉占用进程",
          "访问地址：http://localhost:8080/hello，浏览器直接验证",
        ],
      },
      {
        heading: "第 16 块：Controller 开发——REST 接口三件套",
        paragraphs: [
          "接口开发就三类参数接收：路径参数（/user/1 里的 1）、查询参数（?page=1）、JSON 请求体（POST 提交的对象）。注解分别是 @PathVariable、@RequestParam、@RequestBody。",
          "REST 风格约定：GET 查、POST 增、PUT 改、DELETE 删，URL 用名词复数。返回统一用 Result<T> 包一层，前端只看 code 就能判断成败。",
        ],
        code: {
          lang: "java",
          text: "@RestController\n@RequestMapping(\"/api/user\")\npublic class UserController {\n\n    // 路径参数：GET /api/user/1\n    @GetMapping(\"/{id}\")\n    public Result<UserVO> get(@PathVariable Long id) {\n        return Result.success(null);   // 业务逻辑在 Service\n    }\n\n    // 查询参数：GET /api/user/list?page=1&size=10\n    @GetMapping(\"/list\")\n    public Result<List<UserVO>> list(\n            @RequestParam(defaultValue = \"1\") int page,\n            @RequestParam(defaultValue = \"10\") int size) {\n        return Result.success(null);\n    }\n\n    // JSON 请求体：POST /api/user\n    @PostMapping\n    public Result<Long> add(@RequestBody @Valid UserDTO dto) {\n        return Result.success(null);\n    }\n}",
        },
        list: [
          "@RequestBody 必须配 POST/PUT，且前端 Content-Type 是 application/json",
          "@Valid + 校验注解让参数校验自动生效，非法参数直接 400",
          "别在 Controller 里写业务，它只负责接发——分层的规矩从第一个接口开始",
        ],
      },
      {
        heading: "第 17 块：实战应用——接上数据库跑通全链路",
        paragraphs: [
          "把前面学的全部串起来：Spring Boot + MyBatis Plus 做用户查询接口。三层链路 Controller → Service → Mapper，数据库配置写在 application.yml，Mapper 继承 BaseMapper 零 SQL。",
          "这就是真实项目的骨架：启动类 + 配置 + 三层 + 实体。接下来 MyBatis 专篇再深入动态 SQL 和复杂查询，这一块先让你把链路跑通。",
        ],
        code: [
          {
            lang: "yaml",
            text: "# application.yml：数据源配置\nspring:\n  datasource:\n    url: jdbc:mysql://localhost:3306/demo?useSSL=false&serverTimezone=Asia/Shanghai\n    username: root\n    password: 123456\n  jackson:\n    date-format: yyyy-MM-dd HH:mm:ss",
          },
          {
            lang: "java",
            text: "// Controller：接发\n@RestController\n@RequestMapping(\"/api/user\")\npublic class UserController {\n    private final UserService userService;\n\n    @GetMapping(\"/{id}\")\n    public Result<UserVO> get(@PathVariable Long id) {\n        return Result.success(userService.getById(id));\n    }\n}\n\n// Service：业务\n@Service\npublic class UserService {\n    private final UserMapper userMapper;\n\n    public UserVO getById(Long id) {\n        User u = userMapper.selectById(id);   // MP 自带查询\n        return UserVO.from(u);                // Entity → VO\n    }\n}\n\n// Mapper：继承 BaseMapper，零 SQL\n@Mapper\npublic interface UserMapper extends BaseMapper<User> {\n}",
          },
        ],
        list: [
          "忘了加 @Mapper 或 @MapperScan，Mapper 注入失败直接启动报错",
          "url 里 serverTimezone 不配，连 MySQL 8 会时区报错",
          "Controller 只接发、Service 写业务、Mapper 管 SQL——三层各司其职，从第一天就这么写",
        ],
        quote: "Spring Boot 的魔法，是把二十年前的配置地狱变成了一个注解——而你只需要关心业务。",
      },
      {
        heading: "第 18 块：为什么很多企业都在使用 Java",
        paragraphs: [
          "企业级应用的中流砥柱：银行、电商、政务、通信，核心系统基本都是 Java。原因四个字：稳、全、多、老。",
          "稳：JVM 二十多年打磨，大并发、高可用的方案成熟到可以抄作业；全：Spring 全家桶把开发流程标准化，招人好招、交接容易；多：十年存量系统全是 Java，新项目为了对接旧系统也只能选 Java；老：2000 年代初互联网爆发期 Java 抢占了企业开发身位，先发优势一直吃到现在。",
        ],
        list: [
          "看招聘市场：Java 岗位常年是所有语言里最多的，没有之一",
          "阿里、美团、京东这类大厂的核心业务线大量 Java",
          "语言会换代，但存量系统的维护需求不会消失",
        ],
        quote: "Java 不是最酷的语言，但它是企业最不敢换的语言——银行核心系统一跑就是二十年。",
      },
      {
        heading: "第 19 块：有了 Go，为什么还要学 Java",
        paragraphs: [
          "Go 确实在云原生领域大杀四方（Docker、K8s、微服务网关），性能好、部署简单。但 Go 和 Java 不是一个赛道：Go 偏基础设施，Java 偏业务系统。",
          "学 Java 的理由：岗位基数最大、生态最全、中文资料最多。而且学 Java 的过程本身就是学「企业级工程化」：分层、依赖管理、设计模式，这套思维换任何语言都通用。",
          "Go 值得学，但建议 Java 打底——会 Java 的人学 Go 两周上手，反过来不一定。",
        ],
        list: [
          "Go 的优势：单二进制部署、协程并发模型，适合网关和中间件",
          "Java 的优势：业务系统全家桶，Spring 生态无人能敌",
          "别被「XX 语言要取代 Java」的标题党带节奏，看岗位数量说话",
        ],
        quote: "语言之争是流量密码，岗位之争才是现实——打开招聘网站，Java 的坑位数量会替你做决定。",
      },
      {
        heading: "第 20 块：Java 最高的山——Minecraft",
        paragraphs: [
          "说 Java 做不了大型游戏的人，先看看我的世界：全球销量超 3 亿份、史上最畅销的游戏之一，本体就是 Java 写的。Notch 2009 年用 Java 独立开发，2014 年微软 25 亿美元收购。",
          "它证明了 Java 的两个能力：一是能做 3D 图形游戏（用 LWJGL 调 OpenGL），二是能扛千万级同时在线。庞大的 Mod 生态（Forge/Fabric）全是 Java 的功劳，Mod 开发也成了无数人学 Java 的入口。",
        ],
        code: {
          lang: "java",
          text: "// Minecraft 的世界就是一个大数组：坐标 (x, y, z) 存方块 id\npublic class World {\n    // 一个区块 16x16x64，方块类型用 byte 就够\n    private final byte[][][] blocks = new byte[16][64][16];\n\n    public void setBlock(int x, int y, int z, byte type) {\n        blocks[x][z][y] = type;   // y 是高度\n    }\n\n    public byte getBlock(int x, int y, int z) {\n        return blocks[x][z][y];\n    }\n}\n// 你的世界 = 无数个这样的区块拼起来",
        },
        list: [
          "想玩 Mod：Java 版 + Forge/Fabric，Mod 开发本质就是 Java 开发",
          "基岩版（C++）是后移植的，最早的原版就是 Java",
          "想复刻它：先学 LWJGL 和 OpenGL，再谈渲染",
        ],
        quote: "我的世界证明了 Java 的上限：一个游戏养活了整个 Mod 生态，还顺手成了无数人的编程启蒙老师。",
      },
      {
        heading: "第 21 块：为什么 Java 工程化规范是这样的",
        paragraphs: [
          "前面学的分层、Maven、Entity/VO/DTO，不是谁拍脑袋定的，是 Java 二十多年企业级实战踩坑踩出来的：早期 EJB 太重被抛弃，Spring 用轻量替代，规范一代代沉淀成今天的样子。",
          "根源是 Java 的定位：它从出生就面向企业应用，而企业应用的特点是「人多、代码多、活得久」——所以一切规范都围绕「可维护」：强类型让编译器帮你抓错，Maven 让依赖可复现，分层让几百人的团队能并行开发。规范不是限制，是协作的公共语言。",
          "对比一下：Python 适合个人快速验证，规范随意；Java 天生为团队协作设计，规范严格。选语言，某种程度上就是选协作方式。",
        ],
        list: [
          "Java 规范背后是 JCP/JSR 标准化流程，每个大特性都有类似 RFC 的评审",
          "分层架构的源头可以追溯到 EJB，Spring 是它的轻量改良版",
          "别嫌规范啰嗦，等你在 20 人项目里改别人的代码时就懂了",
        ],
        quote: "Java 的工程化规范，是几十万家企业用二十年踩坑换来的——每一条规定背后都死过一个线上事故。",
      },
    ],
  },
  {
    slug: "java-engineering",
    title: "Java 工程化：项目结构、三层架构与 Entity/VO/DTO",
    excerpt:
      "从「能跑」到「能上线」：Maven 目录结构、三层架构、Entity 为什么分三部分，再到为什么要用框架、MyBatis 与 MyBatis Plus 怎么选。这一篇讲清楚真实项目的代码长什么样。",
    date: "2026-08-13",
    tags: ["Java", "工程化", "架构", "Maven"],
    category: "java",
    readingTime: 19,
    content: [
      {
        heading: "第 1 块：工程化是什么——从「能跑」到「能上线」",
        paragraphs: [
          "练习题只要编译通过、输出正确就完事；真实项目要面对：代码越写越多、多人协作、上线部署、出 bug 要能快速定位。工程化就是把这一堆事用约定和工具固定下来。",
          "工程化三板斧：标准项目结构（Maven 约定）、分层架构（各司其职）、对象分层（Entity/VO/DTO 各管一段）。本篇就讲这三样。",
        ],
        list: [
          "工程化不是炫技，是让三个月后的自己和同事都能快速接手",
          "约定大于配置：Maven 的目录结构是死的，别自创",
        ],
      },
      {
        heading: "第 2 块：Maven 标准目录结构",
        paragraphs: [
          "Maven 约定了一套标准结构，所有 Java 项目长一个样，新人进来不用猜代码放哪：main 放源码，test 放测试，resources 放配置文件。",
          "包名用域名反写：com.llxpy.demo，防止重名。controller/service/mapper/entity/vo/dto 按职责分包。",
        ],
        code: {
          lang: "text",
          text: "demo/\n├── pom.xml                    # 依赖与构建配置\n└── src/\n    ├── main/\n    │   ├── java/com/llxpy/demo/\n    │   │   ├── controller/      # 接收请求（表现层）\n    │   │   ├── service/         # 业务逻辑（业务层）\n    │   │   ├── mapper/          # 数据库操作（持久层）\n    │   │   ├── entity/          # 数据库表映射\n    │   │   ├── vo/              # 给前端看的对象\n    │   │   ├── dto/             # 接口收发的对象\n    │   │   └── config/          # 配置类\n    │   └── resources/           # application.yml、mapper.xml\n    └── test/java/               # 单元测试",
        },
        list: [
          "包名小写、类名大驼峰、方法名小驼峰——命名规范是工程化的地基",
          "resources 和 java 平级，别把配置文件塞进 java 包",
        ],
      },
      {
        heading: "第 3 块：三层架构——各司其职",
        paragraphs: [
          "三层架构是 Java 项目的基本盘：Controller 收请求、Service 写业务、Mapper 管数据库。请求从上往下传，数据从下往上返，每层只干自己的活。",
          "为什么不把所有代码堆在一个类里？一是改一处崩一片，二是没法测试：Service 逻辑单独拎出来就能写单元测试。",
        ],
        code: {
          lang: "java",
          text: "// Controller：只做接发，不写业务\n@RestController\n@RequestMapping(\"/api/user\")\npublic class UserController {\n    private final UserService userService;\n\n    @GetMapping(\"/{id}\")\n    public Result<UserVO> get(@PathVariable Long id) {\n        return Result.success(userService.getById(id));\n    }\n}\n\n// Service：业务逻辑在这，事务也在这\n@Service\npublic class UserService {\n    private final UserMapper userMapper;\n\n    public UserVO getById(Long id) {\n        User user = userMapper.selectById(id);\n        return UserVO.from(user);   // Entity → VO\n    }\n}\n\n// Mapper：只管 SQL，别写 if else\n@Mapper\npublic interface UserMapper {\n    User selectById(Long id);\n}",
        },
        list: [
          "Controller 里出现业务代码（循环、判断）就是分层失守的信号",
          "事务注解 @Transactional 加在 Service 层，加 Controller 上没用",
          "依赖方向永远从上往下：Controller → Service → Mapper",
        ],
        quote: "三层架构的最大价值：出问题时能直接锁定是哪一层的锅。",
      },
      {
        heading: "第 4 块：Entity 为什么分三部分",
        paragraphs: [
          "同一个「用户」在项目里会以三种形态存在：数据库里的行、接口收发的 JSON、页面展示的数据。硬要用一个类通吃，就会出现「表加一个字段，前端和接口全跟着遭殃」。",
          "所以拆成三个：Entity（表结构一对一）、DTO（接口收发的数据）、VO（展示给前端的数据）。它们字段可以一样，但职责必须分开，各改各的互不影响。",
        ],
        code: {
          lang: "java",
          text: "// Entity：和数据库表字段一一对应，别的啥都不干\npublic class User {\n    private Long id;\n    private String username;\n    private String password;   // 密码只在库里存\n    private String phone;\n    private LocalDateTime createTime;\n}\n\n// DTO：接收前端传来的数据（入参），多一个字段校验\npublic class UserDTO {\n    @NotBlank(message = \"用户名不能为空\")\n    private String username;\n    private String password;\n}\n\n// VO：返回给前端的数据（出参），密码绝不能出现在这\npublic class UserVO {\n    private Long id;\n    private String username;\n    private String phone;\n}\n\n// 转换：Entity → VO，只拷贝需要的字段\nUserVO vo = new UserVO();\nvo.setId(user.getId());\nvo.setUsername(user.getUsername());",
        },
        list: [
          "密码、token 这类敏感字段只属于 Entity，VO 里出现就是事故",
          "DTO 管「进来」的校验，VO 管「出去」的展示，Entity 管「存着」的样子",
          "字段多时用 BeanUtils.copyProperties 或 MapStruct 拷贝，别手写十行 setter",
        ],
        quote: "一个对象只干一件事：Entity 对着表，DTO 对着请求，VO 对着页面。",
      },
      {
        heading: "第 5 块：一次请求的完整链路",
        paragraphs: [
          "把前面串起来看一次用户查询请求：前端传参数 → Controller 收 DTO → Service 调 Mapper → 数据库返回 Entity → Service 转 VO → Controller 包 Result → 前端拿到 JSON。",
          "统一返回对象 Result 也是约定：code/message/data 三段式，前端判断 code 就知道成没成，不用为每个接口单独解析。",
        ],
        code: {
          lang: "java",
          text: "// 统一返回：所有接口都长这样\npublic class Result<T> {\n    private Integer code;    // 200 成功，500 失败\n    private String message;\n    private T data;\n\n    public static <T> Result<T> success(T data) {\n        return new Result<>(200, \"ok\", data);\n    }\n    public static <T> Result<T> error(String msg) {\n        return new Result<>(500, msg, null);\n    }\n}\n\n// 请求链路\n// GET /api/user/1\n// Controller: UserDTO 进来（这里校验）\n// Service: 查库、转 VO（这里写业务）\n// Controller: 返回 Result.success(vo)（这里包壳）\n// 前端收到: {\"code\":200,\"message\":\"ok\",\"data\":{...}}",
        },
        list: [
          "Controller 返回类型统一 Result<T>，别这个接口返回 Map 那个返回 String",
          "异常交给全局异常处理器 @RestControllerAdvice，别在 Service 里 try-catch 吞掉",
          "校验注解放在 DTO 字段上，@Valid 触发，省掉手写 if",
        ],
      },
      {
        heading: "第 6 块：为什么要使用框架",
        paragraphs: [
          "回到最原始的 JDBC 写 CRUD：连库、建 Statement、拼 SQL、执行、遍历 ResultSet 手动转对象、关连接——80% 是重复样板代码，还容易漏关连接、拼错 SQL。框架就是把这些脏活累活全部封装掉。",
          "框架的价值有三层：轮子复用（连接池、日志、事务这些不用自己造）、最佳实践（你踩过的坑别人早就踩过并总结成了约定）、统一规范（团队代码长一个样，好交接）。用框架不是偷懒，是站在巨人的肩膀上。",
        ],
        list: [
          "先手写一遍 JDBC 再上框架，你才知道框架替你省了多少事",
          "框架是「约定大于配置」：按它的规矩来，省 80% 配置",
          "别为了用框架而用框架，小工具项目纯 JDBC 反而更轻",
        ],
        quote: "框架不是魔法，是别人把坑踩平后铺好的路——你只管往前走。",
      },
      {
        heading: "第 7 块：MyBatis——半自动的 ORM 框架",
        paragraphs: [
          "MyBatis 是持久层框架（ORM）：Java 方法和 SQL 一一对应，查询结果自动映射成对象。说它「半自动」是因为 SQL 要你自己写——换来的是 SQL 完全可控，复杂查询、多表 JOIN、性能优化都拿捏得住。",
          "核心三件套：Mapper 接口（方法签名）、Mapper XML（SQL 语句）、全局配置（数据源等）。约定：接口方法名 = XML 里的 id，参数用 #{} 占位。",
        ],
        code: [
          {
            lang: "xml",
            text: "<!-- pom.xml 加依赖 -->\n<dependency>\n    <groupId>org.mybatis</groupId>\n    <artifactId>mybatis</artifactId>\n    <version>3.5.16</version>\n</dependency>\n<dependency>\n    <groupId>com.mysql</groupId>\n    <artifactId>mysql-connector-j</artifactId>\n    <version>8.0.33</version>\n</dependency>",
          },
          {
            lang: "java",
            text: "// Mapper 接口：一个方法对应一条 SQL\n@Mapper\npublic interface UserMapper {\n    User selectById(Long id);          // 查\n    int insert(User user);             // 增\n    List<User> selectByName(String name);\n}",
          },
          {
            lang: "xml",
            text: "<!-- UserMapper.xml：SQL 和 Java 解耦，改 SQL 不用动 Java 代码 -->\n<mapper namespace=\"com.llxpy.mapper.UserMapper\">\n    <select id=\"selectById\" resultType=\"com.llxpy.entity.User\">\n        SELECT id, username, phone FROM user WHERE id = #{id}\n    </select>\n</mapper>",
          },
        ],
        list: [
          "SQL 参数永远用 #{}，它是预编译占位符，防 SQL 注入；${} 是字符串拼接，有注入风险",
          "resultType 写的类必须和查询列对得上，字段名不一致用别名或开启驼峰映射",
          "动态 SQL（if/foreach）是 MyBatis 的灵魂，复杂查询全靠它",
        ],
        quote: "MyBatis 让你既享受映射的便利，又保留手写 SQL 的绝对控制权。",
      },
      {
        heading: "第 8 块：MyBatis Plus——只做增强，不做改变",
        paragraphs: [
          "MyBatis Plus（MP）是 MyBatis 的增强工具，口号是「只做增强不做改变」：普通 CRUD 一条 SQL 都不用写，继承 BaseMapper 就自带增删改查；但你要写 SQL 的能力一点没丢。",
          "核心玩法：BaseMapper 内置单表 CRUD + LambdaQueryWrapper 条件构造器（链式写条件，编译期检查列名）+ 分页插件。黑马课程和企业项目基本都用它，写单表操作效率翻倍。",
        ],
        code: [
          {
            lang: "xml",
            text: "<!-- 用 MP 的 starter 依赖，自动整合 Spring Boot -->\n<dependency>\n    <groupId>com.baomidou</groupId>\n    <artifactId>mybatis-plus-boot-starter</artifactId>\n    <version>3.5.5</version>\n</dependency>",
          },
          {
            lang: "java",
            text: "// 继承 BaseMapper：单表 CRUD 一条 SQL 都不用写\n@Mapper\npublic interface UserMapper extends BaseMapper<User> {\n}\n\n// 直接用\nuserMapper.insert(user);              // 增\nUser u = userMapper.selectById(1L);   // 查\nuserMapper.deleteById(1L);            // 删\n\n// 条件构造器：复杂条件链式写，不用拼 SQL\nList<User> list = userMapper.selectList(\n    new LambdaQueryWrapper<User>()\n        .eq(User::getStatus, 1)\n        .ge(User::getScore, 60)\n        .orderByDesc(User::getScore)\n);",
          },
        ],
        list: [
          "MP 只管单表，多表 JOIN 该写 XML 还是写 XML，别硬刚 wrapper",
          "实体类加 @TableName 指定表名，字段驼峰自动映射下划线",
          "逻辑删除、自动填充、乐观锁是 MP 三大常用插件，后面 MyBatis Plus 专篇细讲",
        ],
        quote: "MyBatis 是手动挡，MP 是自动挡——会开手动挡的人，自动挡上手就是零成本。",
      },
      {
        heading: "第 9 块：框架选型——从 SSM 到 Spring Boot",
        paragraphs: [
          "经典组合 SSM = Spring + SpringMVC + MyBatis，统治了 Java 十年；现在的主流是 Spring Boot + MyBatis Plus：Spring Boot 把配置简化到极简（自动装配），MP 把持久层简化到零 SQL，开发体验已经完全不同。",
          "学习顺序建议：先 JDBC 理解原理 → 再 MyBatis 理解映射与 SQL 控制 → 最后 MP 提效。每一步都知道框架在替你做什么，出了问题才能定位——Spring Boot 实战已并入《Java 基础到 JDBC》末尾，本系列后续还有 MyBatis、MyBatis Plus 专篇。",
        ],
        list: [
          "SSM 是面试常客，Spring Boot 是工作主力，两个都得懂",
          "框架迭代快，但底层原理不变：连接、映射、事务、IOC 这些概念永远是核心",
          "下一篇：MyBatis 框架专篇——从 XML 到动态 SQL",
        ],
        quote: "框架的尽头是原理——会用只是开始，懂为什么才是及格。",
      },
    ],
  },
  {
    slug: "sql-basics",
    title: "SQL 大模块开篇：为什么要用 SQL，关系型与非关系型怎么选",
    excerpt:
      "SQL 系列第一篇：Excel 撑不住时为什么要上数据库、SQL 四大类语句、关系型与非关系型的区别，以及项目里 MySQL + Redis + ES 怎么搭配。",
    date: "2026-08-13",
    tags: ["SQL", "MySQL", "Redis", "数据库"],
    category: "sql",
    readingTime: 13,
    content: [
      {
        heading: "第 1 块：为什么不用 Excel，要用数据库",
        paragraphs: [
          "小数据用 Excel 没问题，但数据一大就现原形：10 万行卡到飞起、多人同时改会冲突、不小心删了没后悔药、查询全靠肉眼。数据库就是为这三件事生的。",
          "数据库解决四件事：容量（千万行轻松）、并发（几百人同时读写不乱）、安全（权限、备份、事务）、查询（一条 SQL 秒级出结果）。企业里所有核心数据都在数据库里，SQL 就是和它对话的语言。",
        ],
        list: [
          "Excel 是给人看的，数据库是给程序用的——两者不是替代关系",
          "事务是数据库的底线能力：要么全部成功，要么全部回滚，账不会错",
          "面试必问：为什么用数据库而不用文件存——答案就是上面四点",
        ],
        quote: "数据是企业的命，数据库是保险柜，SQL 是开保险柜的钥匙。",
      },
      {
        heading: "第 2 块：SQL 是什么——四大类语句",
        paragraphs: [
          "SQL（Structured Query Language）是操作关系型数据库的标准语言，各家数据库（MySQL、SQL Server、Oracle）语法九成相通，学会一个其他都是换汤不换药。",
          "四大类：DQL 查询（SELECT，用得最多）、DML 增删改（INSERT/UPDATE/DELETE）、DDL 结构定义（CREATE TABLE 等）、DCL 权限控制（GRANT 等）。日常开发 90% 时间在写 DQL 和 DML。",
        ],
        code: {
          lang: "sql",
          text: "-- DQL：查询（重点中的重点）\nSELECT id, name, score FROM student WHERE score >= 60 ORDER BY score DESC;\n\n-- DML：增删改\nINSERT INTO student(name, score) VALUES ('llxpy', 88);\nUPDATE student SET score = 90 WHERE id = 1;\nDELETE FROM student WHERE id = 2;\n\n-- DDL：建表\nCREATE TABLE student (\n    id INT PRIMARY KEY AUTO_INCREMENT,\n    name VARCHAR(50) NOT NULL,\n    score INT\n);",
        },
        list: [
          "SQL 关键字大小写不敏感，但习惯大写，看着清爽",
          "SELECT 别用 * 全字段，显式列名，性能好且结构清晰",
          "UPDATE/DELETE 忘写 WHERE 就是全表遭殃——先 SELECT 确认再动手",
        ],
      },
      {
        heading: "第 3 块：关系型数据库——三巨头",
        paragraphs: [
          "关系型数据库把数据存成「表」：行是一条记录，列是一个字段，表之间用主键/外键关联。核心优势是结构严谨、支持事务、查询能力强，是业务系统的绝对主力。",
          "MySQL：开源免费、互联网公司绝对主流，黑马课程就是它；SQL Server：微软出品，Windows 企业环境（银行、政务）常见；Oracle：老牌贵族，大厂核心系统在用，贵但稳。三者 SQL 基本通用。",
        ],
        code: {
          lang: "sql",
          text: "-- 学生表 + 成绩表：用外键关联\nCREATE TABLE student (\n    id INT PRIMARY KEY AUTO_INCREMENT,\n    name VARCHAR(50) NOT NULL\n);\n\nCREATE TABLE score (\n    id INT PRIMARY KEY AUTO_INCREMENT,\n    student_id INT NOT NULL,\n    subject VARCHAR(20),\n    value INT,\n    FOREIGN KEY (student_id) REFERENCES student(id)\n);\n\n-- 连表查询：一条 SQL 把两个表串起来\nSELECT s.name, sc.subject, sc.value\nFROM student s\nJOIN score sc ON s.id = sc.student_id\nWHERE sc.value >= 60;",
        },
        list: [
          "主键是每行的唯一身份证，外键是把表连起来的桥",
          "JOIN 是面试必考：INNER JOIN 只要两边都有的，LEFT JOIN 左表全保留",
          "学 MySQL 就够打天下，SQL Server/Oracle 等用到再上手，语法是通的",
        ],
      },
      {
        heading: "第 4 块：非关系型数据库——NoSQL",
        paragraphs: [
          "NoSQL 不是「没有 SQL」，是「不仅仅是 SQL」。它放弃严格的表结构，换来电速（内存存取）、灵活（任意结构）和水平扩展（加机器就能扛），各有专攻。",
          "常见四类：键值型（Redis，缓存/会话，毫秒级）、文档型（MongoDB，灵活 JSON，适合快速迭代）、列族型（HBase，海量数据分析）、搜索型（Elasticsearch，全文搜索/日志分析）。",
        ],
        code: {
          lang: "bash",
          text: "# Redis：键值型，存缓存最常用\nSET user:1 '{\"name\": \"llxpy\"}'    # 写\nGET user:1                        # 读\nEXPIRE user:1 3600                # 1 小时后自动过期（缓存标配）\n\n# MongoDB：文档型，直接存 JSON\ndb.user.insertOne({\"name\": \"llxpy\", \"tags\": [\"java\", \"sql\"]})\ndb.user.find({\"tags\": \"java\"})",
        },
        list: [
          "Redis 的数据在内存里，断电会丢——只放缓存和临时数据，别当主库",
          "MongoDB 适合结构老变的业务，但事务弱于关系型",
          "ES 的核心是倒排索引，搜「关键词」它是王者，搜「精确字段」它不划算",
        ],
      },
      {
        heading: "第 5 块：关系型 vs 非关系型——一张表看懂",
        paragraphs: [
          "选型不是二选一，而是按需搭配。记住核心差异：关系型管「账」——结构、事务、一致性是它的命根子；非关系型管「快」——性能、灵活、扩展是它的强项。",
          "一句话总结：核心业务数据（订单、用户、余额）必须关系型；缓存、搜索、海量日志这类追求速度的活交给非关系型。",
        ],
        list: [
          "对比表：结构固定 vs 灵活；事务支持 vs 弱/无；垂直扩展（加配置）vs 水平扩展（加机器）",
          "一致性：关系型强一致（钱不会多记），非关系型最终一致（可接受短暂延迟）",
          "项目标配：MySQL 存主数据 + Redis 扛热点 + ES 做搜索，各干各的活",
        ],
        quote: "关系型保证不错，非关系型保证不慢——聪明的项目两个都要。",
      },
      {
        heading: "第 6 块：一个真实项目的存储搭配",
        paragraphs: [
          "以博客系统为例看存储全家桶：用户、文章、评论这些核心数据放 MySQL；访问量大的热门文章缓存进 Redis，秒开；站内搜索用 ES 或者直接 MySQL LIKE 凑合（数据量小无所谓）。",
          "后续 SQL 大模块的路线就是顺着这条线走：MySQL 从建库建表到索引优化 → Redis 缓存实战 → SQL Server 企业场景 → VM 虚拟机与 Linux Docker 把数据库部署上线。",
        ],
        code: {
          lang: "text",
          text: "请求进来 → Redis 查缓存（毫秒级）\n                 ↓ 没命中\n              MySQL 查主库（带索引）\n                 ↓ 查到\n              写回 Redis（下次直接命中）\n                 ↓\n              搜索结果 → ES / LIKE\n\n# 一句话架构：MySQL 是仓库，Redis 是前台柜台，ES 是导购员",
        },
        list: [
          "缓存穿透/击穿/雪崩是 Redis 面试三连，后面单独一篇讲",
          "MySQL 建表先想索引，别等数据量大了才后悔",
          "本模块下一篇：MySQL 从安装到 CRUD",
        ],
        quote: "SQL 大模块的路线已铺好：概念打底，MySQL 练手，Redis 加速，最后把数据库搬到 Linux 上跑起来。",
      },
    ],
  },
  {
    slug: "llm-basics",
    title: "大模型的底层：从 Token 到推理，再到 Agent 实战",
    excerpt:
      "大模型模块第一篇：拆开黑盒看底层——Token、Transformer、推理管线、采样参数、上下文窗口，最后用白描协议与 MoLock 管线讲 Agent 工程化。",
    date: "2026-08-13",
    tags: ["大模型", "Transformer", "Token", "Agent"],
    category: "llm",
    readingTime: 17,
    content: [
      {
        heading: "第 1 块：大模型的底层是什么——一条流水线",
        paragraphs: [
          "大模型不是魔法，是一条可以拆解的流水线：文字 → 切成 Token → 变成向量 → 经过 Transformer 层层变换 → 输出下一个词的概率 → 采样成文字。每一段都有对应的技术和工具。",
          "学底层不是为了手搓一个模型，而是为了会用：调参知道改哪里、提示词知道为什么失效、跑偏知道去哪排查。黑盒使用者看运气，懂底层的人看结构。",
        ],
        list: [
          "整条链路五段：分词 → 向量化 → 变换 → 概率 → 采样",
          "API 层看到的是黑盒，底层其实是可拆解的结构",
          "学底层的回报：排查问题、调参数、评估模型时不再靠猜",
        ],
        quote: "模型的魔法来自结构，不来自玄学——把流水线每一段看明白，你就掌握了魔法书。",
      },
      {
        heading: "第 2 块：Token——模型眼中的文字",
        paragraphs: [
          "模型不认识字，只认识 token：分词器把文字切成 token 序列。中文大约一字一个 token，英文一个词可能切成好几个 token。Token 是模型的「最小理解单位」，也是计费单位。",
          "理解 Token 有两个实用价值：算成本（输入输出 token 数直接决定费用）和算上下文（模型能记住的 token 总量有限）。写提示词时能估出预算，是基本功。",
        ],
        code: {
          lang: "python",
          text: "# 用 tiktoken 统计 token 数（OpenAI 的分词器）\nimport tiktoken\n\nenc = tiktoken.get_encoding(\"cl100k_base\")\ntext_zh = \"大模型的底层\"\ntext_en = \"Hello, world!\"\n\nprint(len(enc.encode(text_zh)))   # 中文约一字一 token\nprint(len(enc.encode(text_en)))   # 英文可能一字多 token",
        },
        list: [
          "中文一字约一 token，英文一词约 1.3 个 token，算预算别按字数拍脑袋",
          "上下文窗口和费用都按 token 算，长提示词先估算再提交",
          "不同模型分词器不一样（GPT 的 cl100k、Claude 的自己的），统计用对应库",
        ],
      },
      {
        heading: "第 3 块：Transformer——注意力机制",
        paragraphs: [
          "Transformer 是底层核心，它的灵魂是注意力机制：处理每个词时，不是孤立看它，而是让所有词互相打分、按相关性加权融合——「上下文」就是这么来的。",
          "结构上就是一堆层叠：多头注意力（多个视角同时看）+ 前馈网络 + 位置编码（告诉模型词序）。大模型的「大」就是层数和参数量的堆叠。",
        ],
        code: {
          lang: "python",
          text: "# 注意力机制的核心：Q 提问、K 被查、V 取值\nimport numpy as np\n\ndef attention(Q, K, V):\n    d = Q.shape[-1]\n    scores = np.matmul(Q, K.T) / np.sqrt(d)   # 1. 两两打分\n    weights = softmax(scores, axis=-1)        # 2. 归一化成权重\n    return np.matmul(weights, V)              # 3. 加权求和\n\n# 例：处理「猫追老鼠」时，「追」会高度关注「猫」和「老鼠」。",
        },
        list: [
          "注意力复杂度是 O(n²)：上下文翻倍，计算量翻四倍",
          "Q/K/V 是三个矩阵，别和「查询数据库」混淆",
          "位置编码是必须的：注意力本身不知道词序，全靠它补",
        ],
      },
      {
        heading: "第 4 块：预训练与推理——两副面孔",
        paragraphs: [
          "大模型有两次生命：预训练时，在海量文本上反复学习「下一个词是什么」，把规律压缩进权重——这是烧钱阶段，几万张显卡跑几个月；推理时，拿着权重按给定前缀逐 token 生成——这是你调 API 时发生的事。",
          "预训练学的是「统计规律」，所以模型能接话但不一定说人话；后来的对齐（RLHF 等）是让它「听指令、守规矩」。理解这个分层，就知道为什么模型有时一本正经胡说八道——它只是概率上最像的下一个词。",
        ],
        list: [
          "预训练 ≈ 读万卷书（烧钱），对齐 ≈ 家教（教规矩）",
          "模型生成是逐 token 的，所以长输出天然慢",
          "幻觉的根源：模型输出的是「最可能的下一个词」，不是「事实」",
        ],
        quote: "大模型不是知识库，是概率专家——它知道什么词最像，不知道什么是对的。",
      },
      {
        heading: "第 5 块：推理管线——从提示词到输出",
        paragraphs: [
          "一次完整推理：提示词 → 分词 → 模型前向计算 → 得到下一个 token 的概率分布 → 采样选一个 → 拼回去再算下一个，循环直到结束。你感受到的「打字机效果」就是这个循环。",
          "采样参数就是这层的旋钮：temperature 控制随机性（高=敢说但容易飘，低=稳但呆板）、top_p 截断低概率词、max_tokens 限制输出长度。调这些参数是应用层最常用的底层操作。",
        ],
        code: {
          lang: "python",
          text: "# 采样参数实战（OpenAI 风格，各家大同小异）\nresp = client.chat.completions.create(\n    model=\"deepseek-chat\",\n    messages=[{\"role\": \"user\", \"content\": \"讲个冷笑话\"}],\n    temperature=0.7,    # 0~2：越高越随机，越低越稳定\n    top_p=0.9,          # 只从累积概率 90% 的词里选\n    max_tokens=200,     # 输出上限，防失控\n)\nprint(resp.choices[0].message.content)",
        },
        list: [
          "temperature 调太高会胡言乱语，写代码/算数建议 0~0.3",
          "max_tokens 不够输出会被截断，长文档先估算",
          "固定输出的场景（JSON、分类）把 temperature 调 0，结果才稳定",
        ],
      },
      {
        heading: "第 6 块：上下文窗口——记忆的边界",
        paragraphs: [
          "上下文窗口是模型的「工作记忆」：它能同时看到的 token 总量。窗口越大，能塞进去的资料越多，但成本也越高。",
          "超窗的三种常规解法：截断（丢最老的）、摘要（把历史压缩）、检索（RAG，从外部把相关内容捞进来再拼进上下文）。生产级应用基本都是「检索 + 拼装」的路子。",
        ],
        list: [
          "研究发现：模型对窗口中间的内容记忆最差（lost in the middle），重点信息放开头结尾",
          "塞满窗口不等于都记得，重要指令放最前面",
          "RAG 不是魔法：检索质量决定回答质量，检索库本身要维护",
        ],
        quote: "上下文是租赁的记忆——窗口再大，也不如把关键信息放在它眼前。",
      },
      {
        heading: "第 7 块：Agent 与结构化协议——白描实战",
        paragraphs: [
          "Agent = 模型 + 工具 + 循环：模型决定调哪个工具、看结果、再决定下一步。但自由格式提示词是散文，模型靠「理解意图」执行，容易跑偏——这也是自己项目踩过的坑。",
          "白描（Baimiao）的解法是把技能写成结构化语法 {Domain:{method:[type(param)],[body->(target)];}}：Agent 按槽位执行而不是理解意图，跑偏被结构卡死，实测 token 省 68%。语法即纪律——这是从项目里长出来的底层经验。",
        ],
        code: {
          lang: "text",
          text: "# skills/hello.baim：结构化技能，槽位驱动\n{Hello:\n  {greet:[string(name)],[->\"你好，{name}！\"];}\n  {calc:[int(a),int(b)],[->\"结果：{a+b}\"];}\n}\n\n# 散文式提示词：模型「理解」你的意图，可能跑偏\n# 结构化技能：模型按槽位填空，跑偏被语法卡死",
        },
        list: [
          "Agent 跑偏的第一大原因是提示词太自由，结构化约束是解法之一",
          "省 token 的实质：结构化省掉描述性废话，只保留执行信息",
          "协议先机器可校验（parser 纯本地），再交给模型执行，双保险",
        ],
        quote: "让模型理解意图，不如让模型按槽位执行——语法即纪律，跑偏被结构卡死。",
      },
      {
        heading: "第 8 块：推理链路的工程化——MoLock 的启发",
        paragraphs: [
          "真实 Agent 系统不是「一个巨大的提示词」：它是一条多阶段管线，每层干一件事。MoLock v2.1 就是这么组织的：预处理防注入 → 凝练 → 自检 → 约束 → 意图路由 → 后置校验 → 总控编排，七层各有职责。",
          "这套工程思路的底层逻辑：单次调用做不了的事，拆成多次调用、每步校验；把「模型一次想清楚」降级为「每层只干一件事」。这也是所有靠谱 Agent 系统的共同套路。",
        ],
        code: {
          lang: "text",
          text: "# MoLock v2.1 七模块推理管线（简化示意）\n输入 → 00 预处理(防注入)\n     → 01 经凝练(信息升温)\n     → 02 经文自检(查漏)\n     → 03 说约束(锁真)\n     → 04 意图路由(决定方向)\n     → 05 后置校验(结果把关)\n     → 06 双链总控(编排收尾)\n\n# 核心思想：每层只干一件事，结果逐级把关",
        },
        list: [
          "防注入必须放最前面：用户输入直接进提示词是安全漏洞",
          "路由层决定方向，校验层把关结果——少了哪层都容易翻车",
          "管线每层都要可观测（日志/输出），出问题才能定位是哪层",
        ],
        quote: "单次调用做不到的事，就拆成管线——每层只干一件事，结果逐级把关。",
      },
    ],
  },
  {
    slug: "agent-development",
    title: "Agent 开发实战：RAG、向量模型、Tools、MCP 与 Skills",
    excerpt:
      "大模型模块第二篇：从单次问答到自主循环，RAG 是什么怎么用、向量模型为什么必要、Tools 为什么必须有，以及 Prompt/MCP/Skills 各自解决什么问题。",
    date: "2026-08-13",
    tags: ["Agent", "RAG", "MCP", "向量模型"],
    category: "llm",
    readingTime: 19,
    content: [
      {
        heading: "第 1 块：Agent 是什么——从问答到循环",
        paragraphs: [
          "普通调用是「一问一答」：把问题丢给模型，拿到回答就结束。Agent 是把它升级成循环：模型 → 决定动作（查资料/调工具/写代码）→ 执行 → 看结果 → 再决定下一步，直到任务完成。",
          "Agent 的四个核心件：模型（大脑）、工具（手脚）、记忆（上下文/向量库）、编排循环（怎么决定下一步）。缺了工具它只是个聊天机器人，缺了记忆它每次都是陌生人。",
        ],
        list: [
          "Agent 的本质是循环，不是单次调用——每轮都要决定下一步",
          "工具让模型从「能说」变成「能做」，记忆让对话从「失忆」变成「连贯」",
          "编排要设上限：最大轮数、超时，防止 Agent 无限循环烧钱",
        ],
        quote: "模型决定说什么，Agent 决定做什么——把「说」升级成「做」，就是 Agent。",
      },
      {
        heading: "第 2 块：为什么用 RAG——模型知识的三个边界",
        paragraphs: [
          "RAG（Retrieval-Augmented Generation，检索增强生成）解决的三个硬伤：一是知识截止（模型只知道训练时的数据，今天的事它不知道）；二是幻觉（拿不准时它会编，尤其是细节）；三是私有数据（公司的文档、你的笔记，模型根本没见过）。",
          "RAG 的思路很朴素：别指望模型「记得」，而是在回答前先「查」——把相关资料检索出来拼进提示词，模型照着材料回答。你只需要一个自己的知识库 + 检索能力。",
        ],
        list: [
          "知识截止、幻觉、私有数据——RAG 就是为这三个问题而生的",
          "RAG 不训练模型：改知识只要改资料库，几分钟生效，成本极低",
          "对比微调：微调改「行为风格」，RAG 改「事实内容」，各管各的",
        ],
        quote: "别让模型背知识库，让它带着资料答题——这是 RAG 的全部哲学。",
      },
      {
        heading: "第 3 块：RAG 怎么用——索引、检索、生成三步走",
        paragraphs: [
          "RAG 分离线在线两段：离线先建索引（文档切块 → 向量化 → 存进向量库），在线再走三步（问题向量化 → 检索最相关的几段 → 拼进提示词让模型回答）。",
          "切块是细节活：块太大检索不精准，块太小上下文碎片化，一般 200~800 字一块并保留重叠。检索回来一般取 top-3~5，拼成「材料区」喂给模型，并明确告诉它「只根据材料回答」。",
        ],
        code: {
          lang: "text",
          text: "# 离线（一次做完）\n文档 → 切块(chunk) → 向量化 → 存入向量库\n\n# 在线（每次问答）\n用户问题 → 向量化\n        → 向量库检索 top-3 最相关的块\n        → 拼进提示词（材料区 + 指令：只根据材料回答）\n        → 模型生成回答\n\n# 提示词里的材料区示意\n# 以下是参考资料：\n# [1] ...\n# [2] ...\n# 请只根据参考资料回答，资料里没有就说不知道",
        },
        list: [
          "切块 200~800 字带重叠，检索质量的大头在切块和索引",
          "必须告诉模型「只根据材料回答」，否则它还是爱自己编",
          "检索不到就大方说不知道，硬答就是幻觉",
        ],
      },
      {
        heading: "第 4 块：向量模型——把文字变成坐标",
        paragraphs: [
          "向量模型（Embedding Model）把文字变成一串数字（向量），核心魔法是：语义相近的文字，向量也相近。「猫和狗」比「猫和汽车」更近，不用教，模型自己学的。",
          "为什么 Agent 要用：关键词搜索找不到同义词（搜「怎么给模型喂知识」匹配不到「RAG 文档切块」），向量检索按语义找，跨词面匹配——这是 RAG 检索的底层能力。",
        ],
        code: {
          lang: "python",
          text: "# Embedding：文字 → 向量\nfrom sentence_transformers import SentenceTransformer\n\nmodel = SentenceTransformer(\"BAAI/bge-small-zh\")  # 中文向量模型\nvec = model.encode(\"什么是 RAG\")\nprint(len(vec))   # 输出一个 512 维向量\n\n# 余弦相似度：1=最像，-1=最不像\nimport numpy as np\n\ndef cosine(a, b):\n    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))\n\nq = model.encode(\"怎么给模型喂私有知识\")\ndoc = model.encode(\"RAG 把文档切块转向量存库，查询时找最像的\")\nprint(cosine(q, doc))   # 接近 1，说明语义相近",
        },
        list: [
          "向量模型按语义找，关键词搜索按字面找——这是 RAG 能懂人话的原因",
          "中文向量模型优先：bge、m3e 这些中文效果好于英文模型",
          "向量库常见：Chroma（轻量）、Milvus（大规模）、FAISS（库）",
        ],
      },
      {
        heading: "第 5 块：向量检索实战——完整的 RAG 查询链路",
        paragraphs: [
          "把前面串起来：文档入库（切块 + 向量化 + 存库），查询时问题向量化后在库里找最近的块，再交给模型。几十行代码就是一个能跑的 RAG 雏形。",
          "生产级还要加：元数据过滤（只搜某个分类）、重排序（rerank 把粗检索结果精排）、混合检索（关键词 + 向量合并）。先跑通，再优化。",
        ],
        code: {
          lang: "python",
          text: "# Chroma：轻量向量库，本地就能跑\nimport chromadb\nfrom sentence_transformers import SentenceTransformer\n\nmodel = SentenceTransformer(\"BAAI/bge-small-zh\")\nclient = chromadb.Client()\ncol = client.get_or_create_collection(\"kb\")\n\n# 入库：id + 向量 + 原文\ncol.add(\n    ids=[\"1\", \"2\"],\n    embeddings=[model.encode(\"RAG 检索增强生成\"), model.encode(\"向量模型把文字变坐标\")],\n    documents=[\"RAG 检索增强生成……\", \"向量模型把文字变坐标……\"],\n)\n\n# 查询：问题向量化 → 取最像的\nq = model.encode(\"Agent 怎么查资料\")\nres = col.query(query_embeddings=[q], n_results=2)\nprint(res[\"documents\"])",
        },
        list: [
          "入库和查询必须用同一个向量模型，换模型=全部重入库",
          "n_results 别贪多，3~5 块足够，多了反而稀释注意力",
          "先跑通链路再上 rerank/混合检索，别过度设计",
        ],
      },
      {
        heading: "第 6 块：Tools——Agent 的手脚，为什么必须有",
        paragraphs: [
          "模型的边界：不会算精确的账、不知道实时数据、不能操作外部系统——因为它只产出文字。Tools（函数调用）就是给它装的手脚：模型输出「我要调 get_weather(北京)」，你的代码去执行，把结果还给模型。",
          "没有 Tools 的 Agent 是空谈：搜索、查库、发请求、算数全部做不了。有了 Tools，模型从「知道答案」变成「能拿到答案」——这是 Agent 和聊天机器人的分水岭。",
        ],
        code: {
          lang: "python",
          text: "# 函数调用（function calling）：声明工具 + 模型决定调用\ntools = [\n    {\n        \"type\": \"function\",\n        \"function\": {\n            \"name\": \"get_weather\",\n            \"description\": \"查询指定城市的实时天气\",\n            \"parameters\": {\n                \"type\": \"object\",\n                \"properties\": {\"city\": {\"type\": \"string\"}},\n            },\n        },\n    }\n]\n\n# 流程：模型说想调 get_weather(city=北京)\n# → 你的代码执行函数 → 结果回传模型 → 模型组织成回答",
        },
        list: [
          "工具的 description 写清楚，模型靠它决定调不调、怎么调",
          "工具返回结果要控制长度，太长模型会「忘」了上下文",
          "工具越多越要防注入：外部数据进提示词前先清洗",
        ],
        quote: "模型是大脑，Tools 是手脚——只有大脑没有手脚，Agent 就是个夸夸其谈的聊天室。",
      },
      {
        heading: "第 7 块：Prompt——Agent 的大脑说明书",
        paragraphs: [
          "有工具和检索之后，为什么还要学 Prompt？因为它是唯一不用改代码就能控制模型行为的地方：角色设定、输出格式、约束规则、思考方式全写在里面。同一个模型，提示词写得好不好，效果差一个量级。",
          "Agent 场景的 Prompt 讲究「结构化」：角色 + 目标 + 规则 + 材料区 + 输出格式，每段职责分明。自己项目里的经验是：自由格式提示词容易跑偏，把约束写成结构（白描的槽位式语法）能大幅降低翻车率——提示词工程和协议设计是一回事。",
        ],
        list: [
          "Prompt 四件套：角色、目标、规则、输出格式，缺一效果打折",
          "关键指令放最前面，中间的内容模型容易忽略",
          "规则要可验证：写「输出 JSON」不如给一个 JSON 样例",
        ],
        quote: "Prompt 是 Agent 的宪法——不写代码，但决定代码跑出来的东西对不对。",
      },
      {
        heading: "第 8 块：MCP——工具的 USB 接口",
        paragraphs: [
          "Tools 多了问题就来了：每个工具一套接入方式（SDK、认证、参数格式都不同），接一个工具写一堆胶水代码。MCP（Model Context Protocol，模型上下文协议）就是把这个标准化：所有工具都按统一协议暴露，Agent 一次接入、到处可用。",
          "类比：没有 USB 之前每个外设一个接口，有了 USB 统一即插即用。MCP 是 AI 界的 USB：MCP Server 提供能力（GitHub、数据库、文件系统…），MCP Client（你的 Agent）统一连接。新增工具 = 起一个 Server，Agent 代码不用改。",
        ],
        code: {
          lang: "text",
          text: "# 架构：Agent 不再为每个工具写胶水代码\n\n你的 Agent（MCP Client）\n    │  统一协议：工具名 + 参数 + 结果\n    ├── MCP Server: github（仓库操作）\n    ├── MCP Server: database（SQL 查询）\n    └── MCP Server: filesystem（文件读写）\n\n# 使用流程\n1. 启动 MCP Server（一行命令或配置）\n2. Agent 自动发现它提供的工具清单\n3. 像普通 Tools 一样调用\n\n# 好处：换工具不换代码，生态互通",
        },
        list: [
          "MCP 解决的是「接入成本」：工具标准化后接新的就是配置，不是开发",
          "Server 要鉴权隔离：给 Agent 最小权限，别拿管理员账号",
          "先有 Tools 再有 MCP：理解函数调用，MCP 只是它的标准化包装",
        ],
        quote: "Tools 是手脚，MCP 是给手脚统一的接口标准——没有标准，接十个工具就写十套胶水。",
      },
      {
        heading: "第 9 块：Skills——把成功套路沉淀成技能包",
        paragraphs: [
          "Skills（技能）是比 Prompt 更大一层的封装：一个技能 = 说明（什么时候用）+ 步骤（怎么执行）+ 常用工具 + 输出规范。把反复验证有效的套路固化下来，下次同类任务直接加载，不用重新调提示词。",
          "和 Tools 的区别一句话：Tools 是「能干什么」（能力清单），Skills 是「怎么干得好」（方法论）。白描项目的经验就是 Skills 的极致形态：把技能的说明和步骤写成机器可校验的结构化协议，Agent 按槽位执行，跑偏率大幅下降。",
        ],
        code: {
          lang: "text",
          text: "# Skills 典型结构（Markdown 技能包）\nskills/\n├── web-search.md      # 搜索技能：触发条件 + 搜索步骤 + 结果提炼规范\n├── code-review.md     # 代码审查技能：审查清单 + 输出格式\n└── baim/              # 结构化协议技能（白描风格）\n    └── hello.baim      # 槽位驱动，机器可校验\n\n# 技能内容三要素\n# 1. 什么时候用（触发条件）\n# 2. 怎么执行（步骤/槽位）\n# 3. 什么算做好（验收规范）",
        },
        list: [
          "Skills 的复用价值：套路沉淀一次，全项目受益",
          "技能要写验收规范，否则 Agent 执行完你不知道好不好",
          "结构化技能（可校验）比散文技能（靠理解）更稳——这是项目验证过的",
        ],
      },
      {
        heading: "第 10 块：完整架构——把六件套串起来",
        paragraphs: [
          "一个生产级 Agent 是全家桶：Prompt 定规矩、RAG 供知识、向量模型做检索、Tools 去执行、MCP 统一接入、Skills 沉淀套路。每层解决一个问题，缺哪个就瘸哪条腿。",
          "开发顺序建议：先跑通 Tools（手脚）→ 加 RAG（知识）→ 规范 Prompt（规矩）→ 上 MCP（标准化）→ 沉淀 Skills（复用）。别一上来全家桶，每加一层都先验证收益。",
        ],
        code: {
          lang: "text",
          text: "用户提问\n  → Prompt（角色 + 规则 + 输出格式，控制行为）\n  → RAG（向量模型检索知识库，补齐模型不知道的事实）\n  → Tools（function calling 执行动作，算数/查库/发请求）\n  → MCP（统一接入外部系统，GitHub/数据库/文件…）\n  → Skills（加载验证过的套路，按规范执行）\n  → 校验 + 输出",
        },
        list: [
          "每一层都要可观测：日志记录每步决策，出问题才能定位",
          "按收益排序加功能：先解决最痛的（没工具/没知识），再谈标准化",
          "记住边界：RAG 管事实、Tools 管动作、Prompt 管行为、Skills 管套路",
        ],
        quote: "Agent 的六件套各司其职：Prompt 定规矩、RAG 供知识、向量找材料、Tools 去执行、MCP 接系统、Skills 沉淀套路。",
      },
    ],
  },
]

export function getNote(slug: string): Note | undefined {
  return NOTES.find((n) => n.slug === slug)
}

export function getNotesByCategory(category: NoteCategoryId): Note[] {
  return NOTES.filter((n) => n.category === category)
}

export function getNoteCount(category: NoteCategoryId): number {
  return getNotesByCategory(category).length
}
