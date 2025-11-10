import NotFound from "./pages/public/NotFound.jsx";
// ...
<Routes>
  <Route path="/" element={<Home/>} />
  <Route path="/menu" element={<Menu/>} />
  <Route path="/feedback" element={<Feedback/>} />
  <Route path="/contact" element={<Contact/>} />
  <Route path="*" element={<NotFound/>} />
</Routes>
