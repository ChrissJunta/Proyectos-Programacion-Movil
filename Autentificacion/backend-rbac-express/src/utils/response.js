function ok(res, data, message = "OK") {
  return res.status(200).json({ ok: true, message, data });
}

function created(res, data, message = "CREATED") {
  return res.status(201).json({ ok: true, message, data });
}

function fail(res, status, message) {
  return res.status(status).json({ ok: false, message });
}

module.exports = { ok, created, fail };
