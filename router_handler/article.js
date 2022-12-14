const path = require('path');
// 导入数据库操作模块
const db = require(path.join(__dirname, '../db/index'));

exports.addArticle = (req, res) => {
    // console.log(req.body); // 文本类型的数据
    // console.log('--------分割线----------');
    // console.log(req.file); // 文件类型的数据

    // 手动判断是否上传了文章封面
    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数！');

    // 导入处理路径的 path 核心模块
    const path = require('path');

    const articleInfo = {
        // 标题、内容、状态、所属的分类Id
        ...req.body,
        // 文章封面在服务器端的存放路径
        cover_img: path.join('/uploads', req.file.filename),
        // 文章发布时间
        pub_date: new Date(),
        // 文章作者的Id
        author_id: req.user.id,
    }

    // 定义发布文章的语句
    const sqlInsert = 'insert into ev_articles  set ?';
    // 执行 SQL
    db.query(sqlInsert, articleInfo, (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('发布文章失败!');
        // 发布文章成功
        res.cc('发布文章成功', 0);
    });

    // res.send('ok');
}