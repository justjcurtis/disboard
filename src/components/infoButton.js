export const InfoButton = ({ title, text }) => {
    return (
        <>
            <label className="relative top-[11px] right-[11px] cursor-pointer" htmlFor="infoModal">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            </label>

            <input type="checkbox" id="infoModal" className="modal-toggle" />
            <label htmlFor="infoModal" className="modal">
                <label className="modal-box relative" htmlFor="">
                    <h3 className="text-lg font-bold">{title}</h3>
                    <p className="py-4">{text}</p>
                </label>
            </label>
        </>
    )
}