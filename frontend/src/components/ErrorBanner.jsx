export default function ErrorBanner({ message }) {
  return (
    <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-red-700">
      {message || 'Có lỗi xảy ra. Vui lòng thử lại.'}
    </div>
  )
}
