import logo from "/public/soho.png";
import Image from "next/image";
export const ModalBanner=({onClose,onValidate,handleSubmit})=>{
    const handleModal1Opened = () => {
        document.body.style.overflow = 'hidden'; // Disable scrolling when modal 1 is opened
    };

    return (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog fixed-modal " role="document">
                <div className="modal-content m-content">
                    <div className="d-flex justify-content-end p-1"> <button type="button" className="close" onClick={onClose} aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button></div>
                    <div className="d-flex justify-content-center">
                        <Image src={logo} alt="image" width={"150"}/>
                    </div>
                    <div className="modal-body p-4">
                        <p style={{textAlign:"center",fontSize:"12px",marginBottom:"10px"}}>
                            Soho n&apos;assume aucune responsabilité quant aux marchandises ou services acquis par le biais de son service de transfert en ligne, notamment en ce qui concerne leur livraison.
                            L&apos;activité de Soho se limite à la prestation du service de transfert d&apos;argent, excluant toute responsabilité liée à la réception des biens ou services, dont les litiges doivent être résolus directement entre le détenteur de la carte et le destinataire du transfert.
                        </p>
                        <p style={{textAlign:"center",fontSize:"12px",marginBottom:"10px"}}>
                            Il est impératif de ne jamais envoyer de fonds à une personne inconnue ; les transferts d&apos;argent doivent être réservés uniquement aux connaissances.
                            Il est fortement déconseillé d&apos;envoyer des fonds pour réclamer un gain de loterie.
                        </p>
                        <p style={{textAlign:"center",fontSize:"12px",marginBottom:"10px"}}>
                            L&apos;envoi de fonds à une personne se présentant comme un parent en détresse doit être évité, sauf après confirmation de son identité et de ses dires.
                            Il est à noter que les frais de transfert ne sont pas remboursables, même en cas d&apos;annulation d&apos;un transfert en cours.
                            Veuillez-vous assurer que le compte Mobile Money du bénéficiaire est opérationnel et capable de recevoir le montant envoyé.
                            Une fois un transfert effectué, aucun remboursement n&apos;est possible.
                        </p>
                        <p style={{textAlign:"center",fontSize:"12px",marginBottom:"10px"}}>
                            Veillez à vérifier correctement le numéro de téléphone du bénéficiaire. Soho décline toute responsabilité en cas d&apos;erreur.
                            En cliquant sur le bouton ci-dessous, vous confirmez votre acceptation intégrale de nos conditions générales d&apos;utilisation.
                        </p>
                    </div>
                    <div className="modal-footer justify-content-center">
                        <button type="button" className="cmn-btn" onClick={(e)=>{
                            handleSubmit(e)
                           // onClose()
                        }}><span style={{fontSize:"10px"}} >J&apos;ai pris connaissance et je souhaite procéder au paiement. </span></button>
                    </div>
                </div>
            </div>
        </div>
    )
}


