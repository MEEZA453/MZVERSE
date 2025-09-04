export default function Layout({
  children,
  modal, // 👈 this is the parallel route
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <div>
      {children}
      {modal}
    </div>
  )
}
