export default function ProfilePage() {
  return (
    <div className="">
      {' '}
      <h1 className="typo-h1">Profile Settings</h1>
      <p className="typo-p text-muted">Manage your public LeafLink page profile and links.</p>
      <form action="" className="mt-14 flex flex-col gap-6">
        <h2 className="typo-h2">User</h2>
        <input
          className="bg-input flex gap-3 rounded-full py-4 px-8 items-center justify-center self-stretch placeholder:text-muted w-full focus-visible:outline-primary"
          type="text"
          placeholder="leaf.link/ Username"
        />
        <input
          className="bg-input flex gap-3 rounded-full py-4 px-8 items-center justify-center self-stretch placeholder:text-muted w-full focus-visible:outline-primary"
          type="text"
          placeholder="Profile Picture URL"
        />

        <h2 className="typo-h2">Socials</h2>

        <input
          className="bg-input flex gap-3 rounded-full py-4 px-8 items-center justify-center self-stretch placeholder:text-muted w-full focus-visible:outline-primary"
          type="text"
          placeholder="http://youtube.com/Username"
        />

        <input
          className="bg-input flex gap-3 rounded-full py-4 px-8 items-center justify-center self-stretch placeholder:text-muted w-full focus-visible:outline-primary"
          type="text"
          placeholder="http://youtube.com/Username"
        />

        <input
          className="bg-input flex gap-3 rounded-full py-4 px-8 items-center justify-center self-stretch placeholder:text-muted w-full focus-visible:outline-primary"
          type="text"
          placeholder="http://youtube.com/Username"
        />

        <input
          className="bg-input flex gap-3 rounded-full py-4 px-8 items-center justify-center self-stretch placeholder:text-muted w-full focus-visible:outline-primary"
          type="text"
          placeholder="http://youtube.com/Username"
        />

        <button className="mt-14 flex gap-2 text-background bg-foreground rounded-full py-4 px-8 justify-center self-stretch text-foreground-foreground w-full hover:bg-foreground-inactive">
          Save settings
        </button>
      </form>
    </div>
  )
}
