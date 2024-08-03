import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import PageNotFound from "./components/PageNotFound";
import Home from "./pages/home/Home";
import FormCreateIndex from "./pages/create-form/FormCreateIndex";
import FormEditIndex from "./pages/edit-form/FormEditIndex";
import ViewForm from "./pages/view-form/ViewForm";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <Toaster
          position="top-right"
          toastOptions={{ className: 'react-hot-toast' }}
        />
        <Routes>

          {/* home page route*/}

          <Route path='/' element={<Home />} />

          {/* other routes below*/}

          <Route path='/form/create' element={<FormCreateIndex isEdit={false} isLoading={false} />} />
          <Route path='/form/:id/edit' element={<FormEditIndex />} />
          <Route path='/form/:id' element={<ViewForm />} />

          {/* 404 - error page*/}

          <Route path='*' element={<PageNotFound />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
