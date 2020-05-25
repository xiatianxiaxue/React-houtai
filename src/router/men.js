import { 
    UserOutlined,
    TeamOutlined,
    FileOutlined,
    AuditOutlined,
    HomeOutlined  ,
    LockOutlined,
    DiffOutlined,
    FileTextOutlined,
} from '@ant-design/icons';

const Menarr = [
    {
        title:"首页",
        icon:HomeOutlined,
        path:"/home" //路径跳转
    },
    {
        title:"用户管理",
        icon:UserOutlined,
        path:"/user-manage",
        children:[
            {
                title:"用户列表",
                icon:TeamOutlined ,
                path:"/user-manage/users"
            }
        ]
    },
    {
        title:"权限管理",
        path:"/right-manage",
        icon:AuditOutlined,
        children:[
            {
                title:"角色列表",
                icon:AuditOutlined,
                path:"/right-manage/roule",
            },
            {
                title:"权限列表",
                icon:LockOutlined ,
                path:"/right-manage/rights"
            }
        ]
    },
    {
        title:"文章管理",
        icon:FileOutlined,
        path:"/article-manage",
        children:[
            {
                title:"文章列表",
                icon:DiffOutlined ,
                path:"/article-manage/list"
            },
            {
                title:"文章分类",
                icon:FileTextOutlined ,
                path:"/article-manage/category"
            }
        ]
    }
]



export default Menarr;