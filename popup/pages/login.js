const labelClass = 'text-yellow-300'
const textClass = 'text-black pl-1';

export default function Login({start}) {
  return (
    <form className={`flex min-h-screen flex-col items-left justify-between p-24`}>
      <div>
        <label className={labelClass}>帳號：</label><input className={textClass} name="username"/>
      </div>
      <div>
        <label className={labelClass}>密碼：</label><input type="password" name="password" className={textClass}/>
      </div>
      <div>
        <input type="checkbox" name="deleteDuplicate"/> <label className={labelClass}>是否刪除重覆連線</label>
      </div>
      <div>
        <label className={labelClass}>看板：</label><input name="board" className={textClass}/>
      </div>
      <div>
        <label className={labelClass}>文章代碼：</label><input name="article" className={textClass}/>
      </div>
      <div className={'flex flex-col items-center'}>
        <button className={`bg-stone-500 py-2 px-3`} onClick={start}>送出</button>
      </div>
    </form>
  )
}
