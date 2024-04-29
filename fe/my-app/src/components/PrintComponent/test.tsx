<div>
                                    <div className='flex'>
                                        <div className='w-20'>
                                            <span>Đại diện: </span>
                                            <br />
                                            <span>Địa chỉ:</span>
                                            <br />
                                            <span>Mã số thuế:</span>
                                        </div>
                                        <div className='w-3/4'>
                                            <div className='flex w-1/2'>
                                                <span className='font-bold'>{sellerData.representativeSeller}</span>
                                                <span className='text-right flex-grow'>Chức vụ: <span className='font-bold'>{sellerData.positionSeller}</span></span>
                                            </div>
                                            <span>{sellerData.address}</span>
                                            <br />
                                            <span>{sellerData.taxCode}</span>
                                        </div>
                                    </div>
                                    <p>Hai bên thống nhất khối lượng, giá trị hàng đến 12 h 00&#39; ngày  {today.getDate()}/{today.getMonth() + 1}/{today.getFullYear()} như sau:</p>
                                </div>